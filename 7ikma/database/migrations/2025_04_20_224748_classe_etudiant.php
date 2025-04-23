<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('classe_etudiant', function (Blueprint $table) {
            $table->unsignedInteger('id_classe');
            $table ->uuid("utilisateur_id");
            $table->foreign('utilisateur_id')->references("utilisateur_id")->on('etudiants')->cascadeOnDelete();
            $table->foreign('id_classe')
                  ->references('id_classe')
                  ->on('classes')
                  ->cascadeOnDelete();
            $table->timestamps();
            $table->primary(['id_classe','utilisateur_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classe_etudiant');
    }
};
