<?php

namespace App\Policies;

use App\Models\Blog;
use App\Models\User;

class BlogPolicy
{
    // Anyone (even guest) can view published blogs
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Blog $blog): bool
    {
        if ($blog->is_published) {
            return true;
        }
        // Only owner or admin can view unpublished
        if ($user) {
            return $user->id === $blog->user_id || $user->role === 'admin';
        }
        return false;
    }

    // Only authenticated users can create
    public function create(User $user): bool
    {
        return true;
    }

    // Only owner or admin can update
    public function update(User $user, Blog $blog): bool
    {
        return $user->id === $blog->user_id || $user->role === 'admin';
    }

    // Only owner or admin can delete
    public function delete(User $user, Blog $blog): bool
    {
        return $user->id === $blog->user_id || $user->role === 'admin';
    }

    // Only admin can restore/forceDelete
    public function restore(User $user, Blog $blog): bool
    {
        return $user->role === 'admin';
    }

    public function forceDelete(User $user, Blog $blog): bool
    {
        return $user->role === 'admin';
    }
}
