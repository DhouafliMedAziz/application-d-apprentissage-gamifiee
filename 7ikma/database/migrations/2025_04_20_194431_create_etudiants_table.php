<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtudiantsTable extends Migration
{
    public function up(): void
    {
        Schema::create('etudiants', function (Blueprint $table) {
            $table->uuid('utilisateur_id')->primary();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->string('grade');

            $table->foreign('utilisateur_id')
                  ->references('utilisateur_id')
                  ->on('utilisateurs')
                  ->onDelete('cascade');
                  $table->foreignId('niveau_id')
                  ->after('id')
                  ->constrained('niveaux')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
}

