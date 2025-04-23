<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cours', function (Blueprint $table) {
            $table->id('cours_id')->primary();
            $table->string('titre',100);
            $table->text("description");
            $table->decimal("prix",8)->default(0);
            $table->enum('status', ['free','public','private']);
            $table->integer('points')->default(0);
            $table->decimal('note_moyenne_de_cours', 3, 2)
                  ->default(0.00);
            $table->uuid('utilisateur_id');
            $table->foreign('utilisateur_id')->references("utilisateur_id")->on('profs')->cascadeOnDelete();
            $table->enum('niveau_cours',['easy','medium','hard']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
