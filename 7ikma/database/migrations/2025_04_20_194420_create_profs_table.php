<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfsTable extends Migration
{
    public function up(): void
    {
        Schema::create('profs', function (Blueprint $table) {
            $table->uuid('utilisateur_id')->primary();
            $table->float('note_moyenne')->default(0);
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('utilisateur_id')
                  ->references('utilisateur_id')
                  ->on('utilisateurs')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profs');
    }
}
