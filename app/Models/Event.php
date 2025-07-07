<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'location',
        'start_time',
        'end_time',
        'image_path',
        'creator_id',
        'is_active',
        'max_participants',
        'auto_approve_registration',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_active' => 'boolean',
        'max_participants' => 'integer',
        'auto_approve_registration' => 'boolean',
    ];

    /**
     * Get the creator of the event.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * Get all PICs for the event, including the creator.
     */
    public function pics(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'event_pics')
            ->withPivot('is_creator')
            ->withTimestamps();
    }

    /**
     * Get all registrations for the event.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    /**
     * Get all users registered for the event.
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'event_registrations')
            ->withPivot('status', 'form_data', 'notes')
            ->withTimestamps();
    }

    /**
     * Scope a query to only include active events.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include upcoming events.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now());
    }

    /**
     * Scope a query to only include past events.
     */
    public function scopePast($query)
    {
        return $query->where('end_time', '<', now());
    }

    /**
     * Check if the event is full.
     */
    public function isFull(): bool
    {
        if (!$this->max_participants) {
            return false;
        }

        return $this->registrations()->where('status', 'approved')->count() >= $this->max_participants;
    }

    /**
     * Check if a user is a PIC for this event.
     */
    public function isPic(User $user): bool
    {
        return $this->pics()->where('user_id', $user->id)->exists();
    }

    /**
     * Check if a user is the creator of this event.
     */
    public function isCreator(User $user): bool
    {
        return $this->creator_id === $user->id;
    }
}
