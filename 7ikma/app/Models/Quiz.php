<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'quizzes';
    protected $primaryKey = 'quiz_id';

    protected $fillable = [
        'devoir_id',
        'note',
        'question',
    ];

    public function devoir()
    {
        return $this->belongsTo(
            Devoir::class,
            'devoir_id',
            'devoir_id'
        );
    }

    public function choix()
    {
        return $this->hasMany(
            Choix::class,
            'quiz_id',
            'quiz_id'
        );
    }
}
