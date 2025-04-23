<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ColorOption;

class ColorOptionFactory extends Factory
{
    protected $model = ColorOption::class;

    public function definition(): array
    {
        return [
            'value'        => $this->faker->safeHexColor(),
            'image_kit_url'=> $this->faker->imageUrl(64, 64),
        ];
    }
}

