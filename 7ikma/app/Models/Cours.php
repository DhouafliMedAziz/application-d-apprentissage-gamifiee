<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    /** @use HasFactory<\Database\Factories\CoursFactory> */
    use HasFactory;


    protected $table = 'cours';
    protected $primaryKey = 'cours_id';

    protected $fillable = [
        'titre',
        'desciption',
        'prix',
        'duree',
        'status',
        'max_points',
        'niveau_cours',
        'note_moyenne_du_cours',
        'prof_id'
    ];


   protected function casts():array{

    return [
            'prix'=>'integer',
            'duree'=>'integer',
            'max_points'=>'integer',
            'note_moyenne_du_cours'=>'decimal:2'

    ];
    }



    public function prof()
    {
        return $this->belongsTo(
            Prof::class,
            'prof_id',
            'prof_id'
        );
    }
    /**
     * Get all of the chapiters for the Cours
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function chapiters()
    {
        return $this->hasMany(
            Chapiter::class,
            'cours_id',
            'cours_id'
        );
    }
    public function etudiant(){
        return $this->belongsToMany(
            Etudiant::class,
            'inscreption',
            'cours_id',
            'etudiant_id')
            ->withPivot(['date','taux_de_progression','date_notation','prix','notation','commentaire'])->withTimestamps();
    }

    public function Matiere()
    {
        return $this->BelongsToMany(
            Matiere::class,
         'cours_matiere',
         'cours_id',
         'matiere_id'
        )->withTimestamps();
    }



}
