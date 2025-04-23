<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('lesson_id')->primary();
            $table->unsignedInteger('chapiter_id');

            $table->foreign('chapiter_id')        // which local column
                  ->references('chapiter_id')              // which column on the other table
                  ->on('chapitres')               // which table
                  ->onDelete('cascade');          // cascade deletes


            $table->string('titre');
            $table->string('content_type');
            $table->string('url')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
