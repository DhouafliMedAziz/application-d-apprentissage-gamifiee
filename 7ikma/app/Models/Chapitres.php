<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapitres extends Model
{
    /** @use HasFactory<\Database\Factories\ChapitresFactory> */
    use HasFactory;


    protected $table = 'chapiters';
    protected $primaryKey = 'chapiter_id';

    protected $fillable = [
        'cours_id',
        'titre',
        'chapiter_order',
    ];

    protected function casts(): array
    {
        return [
            'chapiter_order' => 'integer',
        ];
    }

    public function cours()
    {
        return $this->belongsTo(
            Cours::class,
            'cours_id',
            'cours_id'
        );
    }
    public function lessons()
    {
        return $this->hasMany(
            Lesson::class,
            'chapiter_id',   // FK on lessons
            'chapiter_id'    // PK on chapiters
        );
    }

}
