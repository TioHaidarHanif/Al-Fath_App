<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\User;
use App\Models\BlogCategory;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $categories = BlogCategory::all();

        if ($users->isEmpty() || $categories->isEmpty()) {
            $this->command->warn('No users or categories found. Please seed users and categories first.');
            return;
        }

        foreach ($users as $user) {
            foreach ($categories as $category) {
                Blog::factory()->count(2)->create([
                    'user_id' => $user->id,
                    'title' => fake()->sentence(6),
                    'content' => fake()->paragraphs(3, true),
                    'blog_category_id' => $category->id,
                    'is_published' => fake()->boolean(80),
                ]);
            }
        }
    }
}
