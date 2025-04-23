<?php
namespace Database\Factories;

use App\Models\Classe;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClasseFactory extends Factory
{
    protected $model = Classe::class;

    public function definition(): array
    {
        return [
            'nom_de_classe'    => fake()->word() . ' ' . fake()->randomNumber(2),
            'date_de_creation' => fake()->date(),
            'section'          => fake()->randomElement(['A', 'B', 'C', 'D']),
        ];
    }
}
