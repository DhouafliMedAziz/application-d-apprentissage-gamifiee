<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    /** @use HasFactory<\Database\Factories\BattleFactory> */
    use HasFactory;
    protected $fillable = ['devoir_id', 'status'];

    public function participants()
    {
        return $this->belongsToMany(
            Etudiant::class,
            'battle_etudiant',
            'battle_id',
            'etudiant_id'
        )->withPivot(['score', 'joined_at'])->withTimestamps();
    }

    public function quizzes()
    {
        return $this->belongsToMany(
            Quiz::class,
            'battle_quiz',
            'battle_id',
            'quiz_id'
        )->withTimestamps();
    }
}
