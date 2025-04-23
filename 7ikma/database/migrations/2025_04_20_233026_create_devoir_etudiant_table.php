<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('devoir_etudiant', function (Blueprint $table) {
            $table->uuid("utilisateur_id");
            $table->foreign('utilisateur_id')->references("utilisateur_id")->on('etudiants')->cascadeOnDelete();
            $table->unsignedInteger('devoir_id');
            $table->foreign('devoir_id')
                  ->references('devoir_id')
                  ->on('devoirs')
                  ->cascadeOnDelete();

            $table->integer('score')->nullable();
            $table->dateTime('date_submission')->nullable();
            $table->primary(['utilisateur_id','devoir_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devoir_etudiant');
    }
};
