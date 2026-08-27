<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_name',
        'phone',
        'email',
        'service_type',
        'fabric_option',
        'fabric_image_path',
        'style_image_path',
        'appointment_date',
        'status',
        'production_stage',
        'notes',
    ];
}
