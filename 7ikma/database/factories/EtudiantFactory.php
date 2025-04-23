<?php


namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Etudiant;
use App\Models\Niveau;
class EtudiantFactory extends Factory
{
    protected $model = Etudiant::class;

    public function definition(): array
    {
        return [
            'utilisateur_id'    => (string) Str::uuid(),
            'description'       => $this->faker->paragraph(),
            'institut_education' => $this->faker->word(),
            'niveau_id'   => Niveau::inRandomOrder()->first()->id,

        ];
    }
    public function configure(): self
    {
        return $this->afterCreating(function (Etudiant $etudiant) {
            $etudiant->eyeOptions()->attach(
                \App\Models\EyeOption::inRandomOrder()->first()->id
            );
            $etudiant->hatOptions()->attach(
                \App\Models\HatOption::inRandomOrder()->first()->id
            );
            $etudiant->mouthOptions()->attach(
                \App\Models\MouthOption::inRandomOrder()->first()->id
            );
            $etudiant->colorOptions()->attach(
                \App\Models\ColorOption::inRandomOrder()->first()->id
            );
        });
    }
}

