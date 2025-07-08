<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(BlogCategorySeeder::class);
        $this->call(BlogSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(EventRegistrationSeeder::class);
        $this->call(UserSeeder::class);
    }
}
