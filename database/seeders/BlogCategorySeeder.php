<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Technology',
            'Lifestyle',
            'Education',
            'Travel',
            'Food',
            'Health',
            'Finance',
            'Entertainment',
        ];

        foreach ($categories as $name) {
            BlogCategory::firstOrCreate(['name' => $name]);
        }
    }
}
