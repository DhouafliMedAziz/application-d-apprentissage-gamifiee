<?php


namespace Database\Factories;

use App\Models\Quiz;
use App\Models\Devoir;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizFactory extends Factory
{
    protected $model = Quiz::class;

    public function definition(): array
    {
        return [
            'devoir_id' => Devoir::inRandomOrder()->first()->devoir_id,
            'question'  => fake()->sentence(6, true),
        ];
    }
}
