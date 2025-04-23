<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MouthOption;

class MouthOptionFactory extends Factory
{
    protected $model = MouthOption::class;

    public function definition(): array
    {
        return [
            'value'        => $this->faker->word(),
            'image_kit_url'=> $this->faker->imageUrl(64, 64),
        ];
    }
}
