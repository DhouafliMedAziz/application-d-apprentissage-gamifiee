<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    /** @use HasFactory<\Database\Factories\MatiereFactory> */
    use HasFactory;
    protected $table ='matiers';
    protected $primaryKey = 'Matiere_id';
    protected $KeyType = 'int';
     public $incrementing = false;


    protected $fillabel = ['nom','description'];



    /**
     * The Cours that belong to the Matiere
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function Cours(): BelongsToMany
    {
        return $this->belongsToMany(
        Cours::class,
         'cours_matiere'
        , 'matiere_id'
        , 'cours_id');
    }








}
