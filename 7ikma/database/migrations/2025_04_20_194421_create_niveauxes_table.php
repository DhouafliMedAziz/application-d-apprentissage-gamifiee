<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('niveaux', function (Blueprint $table) {
            $table->increments('id')->primary();
            $table->string('name');
            $table->integer('points_required');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('niveaux');
    }
};
