<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('battle_etudiant', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('battle_id');
            $table->uuid('etudiant_id');
            $table->integer('score')->default(0);
            $table->timestamp('joined_at')->nullable();
            $table->timestamps();

            $table->foreign('battle_id')
                  ->references('battle_id')->on('battles')
                  ->cascadeOnDelete();
            $table->foreign('etudiant_id')
                  ->references('utilisateur_id')->on('etudiants')
                  ->cascadeOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('battle_etudiant');
    }
};

