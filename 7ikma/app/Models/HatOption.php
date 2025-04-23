<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HatOption extends Model
{
    protected $table = 'hat_options';
    protected $fillable = [
        'value',
        'image_kit_url',
    ];
}
