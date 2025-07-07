<?php

namespace App\Observers;

use App\Models\Profile;
use App\Models\UserActivity;
use Illuminate\Support\Facades\Auth;

class ProfileObserver
{
    /**
     * Handle the Profile "created" event.
     */
    public function created(Profile $profile): void
    {
        UserActivity::create([
            'user_id' => Auth::id(),
            'action' => 'created',
            'resource_type' => 'profile',
            'resource_id' => $profile->id,
            'old_data' => null,
            'new_data' => json_encode($profile->getAttributes()),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Handle the Profile "updated" event.
     */
    public function updated(Profile $profile): void
    {
        $changes = $profile->getChanges();
        UserActivity::create([
            'user_id' => Auth::id(),
            'action' => 'updated',
            'resource_type' => 'profile',
            'resource_id' => $profile->id,
            'old_data' => json_encode(array_intersect_key($profile->getOriginal(), $changes)),
            'new_data' => json_encode($changes),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Handle the Profile "deleted" event.
     */
    public function deleted(Profile $profile): void
    {
        UserActivity::create([
            'user_id' => Auth::id(),
            'action' => 'deleted',
            'resource_type' => 'profile',
            'resource_id' => $profile->id,
            'old_data' => json_encode($profile->getOriginal()),
            'new_data' => null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Handle the Profile "restored" event.
     */
    public function restored(Profile $profile): void
    {
        //
    }

    /**
     * Handle the Profile "force deleted" event.
     */
    public function forceDeleted(Profile $profile): void
    {
        //
    }
}
