<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Utilisateur;
use App\Models\Prof;
use App\Models\Etudiant;
use App\Models\Niveaux;


 use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Utilisateur::factory(50)->create();
        //Niveaux::Niveau::factory(7)->create();
        Etudiant::factory(35)->create();
        Prof::factory(15)->create();


    }
}
