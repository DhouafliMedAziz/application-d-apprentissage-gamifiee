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
        Schema::create('eye_options', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('value');
            $table->string('image_kit_url');
            $table->timestamps();
        });

        Schema::create('hat_options', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('value');
            $table->string('image_kit_url');
            $table->timestamps();
        });

        Schema::create('mouth_options', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('value');
            $table->string('image_kit_url');
            $table->timestamps();
        });

        Schema::create('color_options', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('value');
            $table->string('image_kit_url');
            $table->timestamps();
        });

        // Pivot tables
        Schema::create('etudiant_eye_option', function (Blueprint $table) {
            $table->uuid('etudiant_id');
            $table->unsignedBigInteger('eye_option_id');
            $table->timestamps();
            $table->primary(['etudiant_id','eye_option_id']);
            $table->foreign('etudiant_id')->references('utilisateur_id')->on('etudiants')->onDelete('cascade');
            $table->foreign('eye_option_id')->references('id')->on('eye_options')->onDelete('cascade');
        });

        Schema::create('etudiant_hat_option', function (Blueprint $table) {
            $table->uuid('etudiant_id');
            $table->unsignedBigInteger('hat_option_id');
            $table->timestamps();
            $table->primary(['etudiant_id','hat_option_id']);

            $table->foreign('etudiant_id')->references('utilisateur_id')->on('etudiants')->onDelete('cascade');
            $table->foreign('hat_option_id')->references('id')->on('hat_options')->onDelete('cascade');
        });

        Schema::create('etudiant_mouth_option', function (Blueprint $table) {
            $table->uuid('etudiant_id');
            $table->unsignedBigInteger('mouth_option_id');
            $table->timestamps();
            $table->primary(['etudiant_id','mouth_option_id']);

            $table->foreign('etudiant_id')->references('utilisateur_id')->on('etudiants')->onDelete('cascade');
            $table->foreign('mouth_option_id')->references('id')->on('mouth_options')->onDelete('cascade');
        });

        Schema::create('etudiant_color_option', function (Blueprint $table) {
            $table->uuid('etudiant_id');
            $table->unsignedBigInteger('color_option_id');
            $table->timestamps();
            $table->primary(['etudiant_id','color_option_id']);

            $table->foreign('etudiant_id')->references('utilisateur_id')->on('etudiants')->onDelete('cascade');
            $table->foreign('color_option_id')->references('id')->on('color_options')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiant_color_option');
        Schema::dropIfExists('etudiant_mouth_option');
        Schema::dropIfExists('etudiant_hat_option');
        Schema::dropIfExists('etudiant_eye_option');
        Schema::dropIfExists('color_options');
        Schema::dropIfExists('mouth_options');
        Schema::dropIfExists('hat_options');
        Schema::dropIfExists('eye_options');
    }
};

