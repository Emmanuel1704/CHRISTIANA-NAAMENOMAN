<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class OrderController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'items' => 'required|array|min:1',
            'total_amount' => 'required|numeric',
        ]);

        DB::transaction(function () use ($request) {
            $order = Order::create([
                'customer_name' => $request->customer_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'total_amount' => $request->total_amount,
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'collection_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
        });

        return redirect()->back();
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with('items.collection')->latest()->get(),
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $request->validate(['status' => 'required|string']);
        $order->update(['status' => $request->status]);
        return redirect()->back();
    }
}
