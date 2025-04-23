<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choix extends Model
{
    use HasFactory;

    protected $table = 'choix';
    protected $primaryKey = 'choix_id';

    protected $fillable = [
        'quiz_id',
        'contenu',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
        ];
    }
    public function quiz()
    {
        return $this->belongsTo(
            Quiz::class,
            'quiz_id',
            'quiz_id'
        );
    }
}
