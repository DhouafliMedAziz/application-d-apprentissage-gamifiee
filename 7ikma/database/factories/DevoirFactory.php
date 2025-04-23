<?php

namespace Database\Factories;

use App\Models\Devoir;
use Illuminate\Database\Eloquent\Factories\Factory;

class DevoirFactory extends Factory
{
    protected $model = Devoir::class;

    public function definition(): array
    {
        return [
            'titre'        => fake()->sentence(3),
            'points'       => fake()->numberBetween(1, 100),
            'max_score'    => fake()->numberBetween(50, 100),
            'date_final'   => fake()->dateTimeBetween('-1 week', '+1 month')->format('Y-m-d'),
        ];
    }
}
