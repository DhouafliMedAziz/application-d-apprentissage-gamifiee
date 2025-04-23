<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Utilisateur;
use App\Models\Prof;
use App\Models\Etudiant;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Utulisateur::factory(50)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    }
}
