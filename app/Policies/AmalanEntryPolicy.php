<?php

namespace App\Policies;

use App\Models\AmalanEntry;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AmalanEntryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can view their own entries
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AmalanEntry $amalanEntry): bool
    {
        // Users can only view their own entries, admins can view all
        return $user->id === $amalanEntry->user_id || $user->role === 'admin';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // All authenticated users can create entries
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, AmalanEntry $amalanEntry): bool
    {
        // Users can only update their own entries, admins can update all
        return $user->id === $amalanEntry->user_id || $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AmalanEntry $amalanEntry): bool
    {
        // Users can only delete their own entries, admins can delete all
        return $user->id === $amalanEntry->user_id || $user->role === 'admin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AmalanEntry $amalanEntry): bool
    {
        // Users can only restore their own entries, admins can restore all
        return $user->id === $amalanEntry->user_id || $user->role === 'admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AmalanEntry $amalanEntry): bool
    {
        // Only admins can permanently delete entries
        return $user->role === 'admin';
    }
}
