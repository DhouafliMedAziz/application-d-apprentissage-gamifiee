<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;

    protected $table = 'niveaux';
    protected $fillable = [
        'name',
        'points_required',
    ];

    /**
     * Laravel 11 method-based casts (optional here)
     */
    protected function casts(): array
    {
        return [
            'points_required' => 'integer',
        ];
    }

    /**
     * One Niveau has many Etudiants
     */
    public function etudiants()
    {
        return $this->hasMany(
            Etudiant::class,
            'niveau_id',
            'utilistateur_id'
        );
    }
}

