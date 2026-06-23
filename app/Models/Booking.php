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
        'appointment_date',
        'status',
        'notes',
    ];
}
