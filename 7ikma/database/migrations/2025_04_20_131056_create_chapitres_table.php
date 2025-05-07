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
        Schema::create('chapitres', function (Blueprint $table) {
            $table->increments('chapiter_id')->primary();

            $table->unsignedInteger('cours_id');
            $table->foreign('cours_id')
                  ->references('cours_id')
                  ->on('cours')
                  ->cascadeOnDelete();

            $table->string('titre');
            $table->integer('chapiter_order');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapitres');
    }
};
