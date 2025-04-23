<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Chapiter;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        $types = ['video', 'text', 'pdf'];
        return [
            'chapiter_id'   => Chapiter::inRandomOrder()->first()->chapiter_id,
            'titre'         => fake()->sentence(4),
            'content_type'  => fake()->randomElement($types),
            // only generate a URL for types that need it
            'url'           => fake()->randomElement(['video','pdf'])
                                ? fake()->url()
                                : null,
        ];
    }
}

