<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Prof;

class ProfFactory extends Factory
{
    protected $model = Prof::class;

    public function definition(): array
    {
        return [
            'utilisateur_id'    => (string) Str::uuid(),
            'note_moyenne'      => $this->faker->randomFloat(2, 0, 5),
            'description'       => $this->faker->paragraph(),
        ];
    }
}
