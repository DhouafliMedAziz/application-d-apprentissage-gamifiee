<?php

namespace Database\Factories;

use App\Models\Chapiter;
use App\Models\Cours;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChapiterFactory extends Factory
{
    protected $model = Chapiter::class;

    public function definition(): array
    {
        // ensure there’s at least one course:
        $cours = Cours::inRandomOrder()->first()->cours_id;

        return [
            'cours_id'        => $cours,
            'titre'           => fake()->sentence(3),
            'chapiter_order'  => fake()->numberBetween(1, 20),
        ];
    }
}
