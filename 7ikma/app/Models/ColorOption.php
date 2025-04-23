<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ColorOption extends Model
{
    protected $table = 'color_options';
    protected $fillable = [
        'value',
        'image_kit_url'
    ];
}
