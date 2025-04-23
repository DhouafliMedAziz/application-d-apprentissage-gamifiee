<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cours_matiere', function (Blueprint $table) {
            $table->unsignedInteger('cours_id');
            $table->unsignedInteger('matiere_id');
            $table->foreign('cours_id')->references("cours_id")->on('cours')->cascadeOnDelete();
            $table->foreign('matiere_id')->references("matiere_id")->on('matiers')->cascadeOnDelete();
            $table->primary(['cours_id','matiere_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cours_matiere');
    }
};
