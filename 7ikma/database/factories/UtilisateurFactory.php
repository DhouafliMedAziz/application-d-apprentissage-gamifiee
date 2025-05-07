<?php
namespace Database\Factories;

use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UtilisateurFactory extends Factory
{
    protected $model = Utilisateur::class;

    public function definition(): array
    {
        return [
            'utilisateur_id'       => (string) Str::uuid(),
            'nom_d_utilisateur'   => $this->faker->userName(),
            'email'               => $this->faker->unique()->safeEmail(),
            'mot_passe'           =>  Hash::make('password'),
            'profile_picture_URL' => null,
            'points_totales'      => 0,
            'coins'               => 100,
            'email_verified_at'   => now(),
            'remember_token'      => Str::random(10),
            'institut_education' => $this->faker->word(),
            'pays' => $this->faker->country
        ];
    }
}

