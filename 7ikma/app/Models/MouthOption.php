<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MouthOption extends Model
{
    protected $table = 'mouth_options';
    protected $fillable = [
        'value',
        'image_kit_url'
    ];
}
