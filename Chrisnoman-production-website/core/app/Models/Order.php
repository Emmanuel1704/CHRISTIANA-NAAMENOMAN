<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'email',
        'phone',
        'address',
        'total_amount',
        'currency',
        'status',
        'payment_status',
        'payment_method',
        'momo_network',
        'momo_number',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
