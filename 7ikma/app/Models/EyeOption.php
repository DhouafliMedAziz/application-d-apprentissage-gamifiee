<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EyeOption extends Model
{
    protected $table = 'eye_options';
    protected $fillable = [
        'value',
        'image_kit_url'
    ];
}
