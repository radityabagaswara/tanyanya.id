<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\User;
use Faker\Factory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Uid\Ulid;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        $page = $user->page()->create([
            'username' => 'testuser',
            'is_accepting_questions' => false,
            'allow_anon_questions' => false,
            'overlay_key' => Ulid::generate(),
        ]);

        // random question
        for ($i = 0; $i < 10; $i++) {
            $faker = Factory::create();
            Question::create([
                'question' => $faker->sentence(180),
                'is_anonymous' => false,
                'sender_id' => $user->id,
                'page_id' => $page->id,
            ]);
            sleep(1);
        }
    }
}
