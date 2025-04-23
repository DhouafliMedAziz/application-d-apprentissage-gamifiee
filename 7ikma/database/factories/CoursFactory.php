<?php

namespace Database\Factories;

use App\Models\Cours;
use App\Models\Prof;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;

class CoursFactory extends Factory
{
    protected $model = Cours::class;

    public function definition(): array
    {
        // ensure there’s at least one Prof & Niveau
        $prof   = Prof::inRandomOrder()->first()->id;
        $niveau = Niveau::inRandomOrder()->first()->id;

        return [
            'titre'                    => fake()->sentence(3),
            'description'              => fake()->paragraph(),
            'prix'                     => fake()->numberBetween(0, 500),
            'duree'                    => fake()->randomElement(['1h','2h30','3h45']),
            'status'                   => fake()->randomElement(['free','public','private']),
            'niveau_id'                => fake()->randomElement(['easy','medium','hard']),
            'points'                   => fake()->numberBetween(0, 100),
            'note_moyenne_de_cours'    => fake()->randomFloat(2, 0, 5),
            'prof_id'                  => $prof,
        ];
    }
}
