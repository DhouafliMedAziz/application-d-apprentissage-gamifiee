<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $table = 'classes';
    protected $primaryKey = 'id_classe';

    protected $fillable = [
        'nom_de_classe',
        'date_de_creation',
        'section',
        'prof_id'
    ];

    protected $casts = [
        'date_de_creation' => 'date',
    ];
    public function prof()
    {
        return $this->belongsTo(
            Prof::class,
            'prof_id',
            'prof_id'
        );
    }

    public function etudiants()
    {
        return $this->belongsToMany(
            Etudiant::class,
            'classe_etudiant',
            'id_classe',     // this model’s FK on pivot
            'etudiant_id'    // related model’s FK on pivot
        )->withTimestamps();
    }



}
