<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        // Get some users to be creators and PICs
        $users = User::inRandomOrder()->take(5)->get();
        if ($users->count() < 2) {
            $users = User::factory(5)->create();
        }

        foreach (range(1, 5) as $i) {
            $creator = $users->random();
            $event = Event::create([
                'name' => 'Event ' . $i,
                'description' => 'Description for event ' . $i,
                'location' => 'Location ' . $i,
                'start_time' => now()->addDays($i),
                'end_time' => now()->addDays($i)->addHours(2),
                'creator_id' => $creator->id,
                'is_active' => true,
                'auto_approve_registration' => $i % 2 === 0,
            ]);
            // Add creator as PIC
            $event->pics()->attach($creator->id, ['is_creator' => true]);
            // Optionally add another PIC
            $otherPic = $users->where('id', '!=', $creator->id)->random();
            $event->pics()->attach($otherPic->id, ['is_creator' => false]);
        }
    }
}
