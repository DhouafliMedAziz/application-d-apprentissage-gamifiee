<?php


namespace App\Models;

class Etudiant extends Utilisateur
{
    protected $table = 'etudiants';

    protected $fillable = [
        'description',
        'grade'
    ];

    public function eyeOptions()
    {
        return $this->belongsToMany(EyeOption::class, 'etudiant_eye_option', 'etudiant_id', 'eye_option_id');
    }

    public function hatOptions()
    {
        return $this->belongsToMany(HatOption::class, 'etudiant_hat_option', 'etudiant_id', 'hat_option_id');
    }

    public function mouthOptions()
    {
        return $this->belongsToMany(MouthOption::class, 'etudiant_mouth_option', 'etudiant_id', 'mouth_option_id');
    }

    public function colorOptions()
    {
        return $this->belongsToMany(ColorOption::class, 'etudiant_color_option', 'etudiant_id', 'color_option_id');
    }

    public function niveau()
    {
        return $this->belongsTo(
            Niveau::class,
            'niveau_id',
            'id'
        );
    }
    public function level()
    {
        return $this->niveau();
    }
    public function cours(){
        return $this->belongsToMany(
            Cours::class,
            'inscpretion',
            'etudiant_id',
            'cours_id')
            ->withPivot(['date','taux_de_progression','date_notation','prix','notation','commentaire'])->withTimestamps();
    }
    public function classes()
    {
        return $this->belongsToMany(
            Classe::class,
            'classe_etudiant',
            'etudiant_id',
            'id_classe'
        )->withTimestamps();
    }

    public function devoirs()
    {
        return $this->belongsToMany(
                Devoir::class,
                'devoir_etudiant',
                'etudiant_id',
                'devoir_id'
            )
            ->withPivot(['score', 'date_submission'])
            ->withTimestamps();
    }
    public function battles()
{
    return $this->belongsToMany(Battle::class, 'battle_etudiant')
                ->withPivot('score', 'joined_at')
                ->withTimestamps();
}

}
