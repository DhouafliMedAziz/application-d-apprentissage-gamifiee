<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('choix', function (Blueprint $table) {
            $table->increments('choix_id')->primary();
            $table->unsignedInteger('quiz_id');
            $table->foreign('quiz_id')
                  ->references('quiz_id')
                  ->on('quizzes')
                  ->cascadeOnDelete();

            $table->text('contenu');
            $table->boolean('status')
                  ->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('choix');
    }
};
