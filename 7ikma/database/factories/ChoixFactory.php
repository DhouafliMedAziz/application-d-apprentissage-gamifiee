<?php

namespace Database\Factories;

use App\Models\Choix;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChoixFactory extends Factory
{
    protected $model = Choix::class;

    public function definition(): array
    {
        return [
            'quiz_id'  => Quiz::inRandomOrder()->first()->quiz_id,
            'contenu'  => fake()->sentence(4, true),
            'status'   => fake()->boolean(25),
        ];
    }
}
