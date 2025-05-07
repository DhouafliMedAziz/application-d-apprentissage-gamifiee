<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devoir extends Model
{
    use HasFactory;

    protected $table = 'devoirs';
    protected $primaryKey = 'devoir_id';

    protected $fillable = [
        'titre',
        'points',
        'max_score',
        'date_final',
        'lesson_id'
    ];

    protected function casts(): array
    {
        return [
            'points'          => 'integer',
            'max_score'       => 'integer',
            'date_final'      => 'date',
        ];
    }

    public function etudiants()
    {
        return $this->belongsToMany(
                Etudiant::class,
                'devoir_etudiant',
                'devoir_id',
                'etudiant_id'
            )
            ->withPivot(['score', 'date_submission'])
            ->withTimestamps();
    }


    /**
     * Get all of the quiz for the Devoir
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function quiz(): HasMany
    {
        return $this->hasMany(Quiz::class, 'devoir_id', 'devoir_id');
    }
    /**
     * Get the lesson that owns the Devoir
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class, 'lesson_id', 'lesson_id');
    }




}
