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


        Schema::create('classes', function (Blueprint $table) {
        $table->increments('id_classe');
        $table->string('nom_de_classe');
        $table->date('date_de_creation');
        $table->string('section');
        $table->uuid('prof_id');
        $table->timestamps();
        $table->foreign('prof_id')->references('utilisateur_id')
        ->on('profs')
        ->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
