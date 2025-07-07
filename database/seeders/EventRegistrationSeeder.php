<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\User;
use App\Models\EventRegistration;

class EventRegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $events = Event::all();
        if ($users->count() < 2 || $events->count() < 1) {
            return;
        }
        foreach ($events as $event) {
            // Register 3 random users for each event
            $registrants = $users->random(min(3, $users->count()));
            foreach ($registrants as $user) {
                EventRegistration::firstOrCreate([
                    'event_id' => $event->id,
                    'user_id' => $user->id,
                ], [
                    'status' => $event->auto_approve_registration ? 'approved' : 'pending',
                ]);
            }
        }
    }
}
