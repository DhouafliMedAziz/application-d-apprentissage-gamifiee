<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('devoirs', function (Blueprint $table) {
            $table->increments('devoir_id')->primary();
            $table->unsignedInteger('lesson_id');
            $table->foreign('lesson_id')->references("lesson_id")->on('lessons')->cascadeOnDelete();
            $table->string('titre');
            $table->integer('points');
            $table->integer('max_score');
            $table->date('date_final');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devoirs');
    }
};
