<?php

namespace App\Observers;

use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Support\Facades\Auth;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        UserActivity::create([
            'user_id' => Auth::id()?? null, // Use Auth::id() if available, otherwise null
            'action' => 'created',
            'resource_type' => 'user',
            'resource_id' => $user->id,
            'old_data' => null,
            'new_data' => json_encode($user->getAttributes()),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $changes = $user->getChanges();
        UserActivity::create([
            'user_id' => Auth::id(),
            'action' => 'updated',
            'resource_type' => 'user',
            'resource_id' => $user->id,
            'old_data' => json_encode(array_intersect_key($user->getOriginal(), $changes)),
            'new_data' => json_encode($changes),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        UserActivity::create([
            'user_id' => Auth::id(),
            'action' => 'deleted',
            'resource_type' => 'user',
            'resource_id' => $user->id,
            'old_data' => json_encode($user->getOriginal()),
            'new_data' => null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
