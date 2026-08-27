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
            'currency' => 'nullable|string|in:GHS,USD,EUR,GBP',
            'payment_method' => 'required|string|in:momo,whatsapp,cod',
            'momo_network' => 'nullable|string|in:mtn,telecel,at',
            'momo_number' => 'nullable|string|max:20',
        ]);

        $order = null;

        DB::transaction(function () use ($request, &$order) {
            $order = Order::create([
                'customer_name' => $request->customer_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'total_amount' => $request->total_amount,
                'currency' => $request->currency ?? 'GHS',
                'payment_method' => $request->payment_method,
                'momo_network' => $request->momo_network,
                'momo_number' => $request->momo_number,
                'payment_status' => 'unpaid',
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

        if ($request->payment_method === 'momo' && filled(env('PAYSTACK_SECRET_KEY'))) {
            $response = \Illuminate\Support\Facades\Http::withHeaders([
                'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
                'Content-Type' => 'application/json',
            ])->post('https://api.paystack.co/transaction/initialize', [
                'email' => $request->email,
                'amount' => $request->total_amount * 100,
                'currency' => $request->currency ?? 'GHS',
                'callback_url' => route('payment.callback'),
                'metadata' => [
                    'order_id' => $order->id,
                ],
            ]);

            if ($response->successful()) {
                $authUrl = $response->json()['data']['authorization_url'];
                return Inertia::location($authUrl);
            }
        }

        if ($request->payment_method === 'momo') {
            $order->update(['payment_status' => 'paid', 'status' => 'processing']);
        }

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
