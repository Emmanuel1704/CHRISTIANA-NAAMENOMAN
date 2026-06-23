<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'collection_id',
        'customer_name',
        'rating',
        'comment',
        'is_approved',
    ];

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
}
