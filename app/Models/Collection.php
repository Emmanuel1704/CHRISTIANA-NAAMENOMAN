<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'image_path',
        'price',
        'stock_status',
    ];
}
