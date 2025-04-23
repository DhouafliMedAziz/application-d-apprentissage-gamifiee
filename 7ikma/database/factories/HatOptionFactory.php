<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\HatOption;

class HatOptionFactory extends Factory
{
    protected $model = HatOption::class;

    public function definition(): array
    {
        return [
            'value'        => $this->faker->word(),
            'image_kit_url'=> $this->faker->imageUrl(64, 64),
        ];
    }
}
