<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('inscreption', function (Blueprint $table) {
            $table->uuid('etudiant_id');
            $table->foreign('etudiant_id')
            ->references('utilisateur_id')
            ->on('etudiants')
            ->cascadeOnDelete();

            $table->unsignedInteger('cours_id');
            $table->foreign('cours_id')
                  ->references('cours_id')
                  ->on('cours')
                  ->cascadeOnDelete();
            $table->primary(['etudiant_id','cours_id']);
            $table->dateTime('date')->now();
            $table->decimal('notation', 1, 2)->default(0.0);
            $table->decimal('taux_de_progression', 3, 2)->nullable()->default(0.0);
            $table->Text("commentaire")->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inscreption');
    }
};

