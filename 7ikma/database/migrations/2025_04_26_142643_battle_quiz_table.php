<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('battle_quiz', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('battle_id');
            $table->unsignedBigInteger('quiz_id');
            $table->timestamps();

            $table->foreign('battle_id')
                  ->references('battle_id')->on('battles')
                  ->cascadeOnDelete();
            $table->foreign('quiz_id')
                  ->references('quiz_id')->on('quizzes')
                  ->cascadeOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('battle_quiz');
    }
};
