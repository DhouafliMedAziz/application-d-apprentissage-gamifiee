<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lessons extends Model
{
    /** @use HasFactory<\Database\Factories\LessonsFactory> */
    use HasFactory;
    protected $table='lessons';
    protected $primaryKey = 'lesson_id';
    protected $fillable = [
        'chapiter_id',
        'titre',
        'content_type',
        'url',
    ];

    protected function casts(): array
    {
        return [
            'content_type' => 'string',
            'url'          => 'string',
        ];
    }
    public function chapiter()
    {
        return $this->belongsTo(
            Chapiter::class,
            'chapiter_id',
            'chapiter_id'
        );
    }

    public function devoir()
    {
        return $this->hasMany(Devoir::class,'lesson_id','lesson_id');
    }




}
