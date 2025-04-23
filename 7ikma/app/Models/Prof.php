<?php

namespace App\Models;

class Prof extends Utilisateur
{
    protected $table = 'profs';

    protected $fillable = [
        'note_moyenne',
        'description',
    ];

    public function classes()
    {
        return $this->hasMany(
            Classe::class,
            'utilisateur_id',
            'id'
        );
    }
}

