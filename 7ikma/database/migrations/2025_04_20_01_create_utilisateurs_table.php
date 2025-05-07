<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateursTable extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->uuid('utilisateur_id')->primary();
            $table->string('nom_d_utilisateur', 32)->unique();
            $table->string('email')->unique();
            $table->string('mot_passe', 128);
            $table->string('profile_picture_URL', 64)->nullable();
            $table->integer('points_totales')->default(0);
            $table->integer('coins')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->string('institut_education');
            $table->string('pays');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
}
