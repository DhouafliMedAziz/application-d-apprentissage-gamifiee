<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    // Table & primary key
    protected $table = 'utilisateurs';
    protected $primaryKey = 'utilisateur_id';
    public $incrementing = false;
    protected $keyType = 'string';

    // Mass assignable attributes
    protected $fillable = [
        'nom_d_utilisateur',
        'email',
        'mot_passe',
        'profile_picture_URL',
        'points_totales',
        'coins',
       'institut_education',
        'pays'
    ];

    // Hidden on serialization
    protected $hidden = [
        'mot_passe',
        'remember_token',
    ];

    // Casts
    protected $casts = [
        'email_verified_at' => 'datetime',
        'points_totales'    => 'integer',
        'coins'             => 'integer',
        'mot_passe' => 'hashed'
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
    public function getAuthPassword(): string
    {
        return $this->mot_passe;
    }

}

