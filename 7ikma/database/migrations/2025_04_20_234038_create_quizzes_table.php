<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->increments('quiz_id')->primary();
            $table->unsignedInteger('devoir_id');
            $table->string('question');
            $table->timestamps();
            $table->foreign('devoir_id')
                  ->references('devoir_id')
                  ->on('devoirs')
                  ->cascadeOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
