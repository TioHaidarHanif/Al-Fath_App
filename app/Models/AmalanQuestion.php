<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AmalanQuestion extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'description',
        'input_type',
        'options',
        'is_active',
        'display_order'
    ];
    
    protected $casts = [
        'options' => 'array',
        'is_active' => 'boolean',
    ];
    
    /**
     * Get the entries for this question.
     */
    public function entries()
    {
        return $this->hasMany(AmalanEntry::class);
    }
}
