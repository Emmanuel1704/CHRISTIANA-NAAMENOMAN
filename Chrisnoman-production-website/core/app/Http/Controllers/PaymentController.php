<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function handleCallback(Request $request)
    {
        $reference = $request->query('reference');
        if (!$reference) {
            return redirect()->route('home')->with('error', 'No reference found.');
        }

        $secretKey = env('PAYSTACK_SECRET_KEY');

        // Verify transaction via Paystack API
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $secretKey,
            'Content-Type' => 'application/json',
        ])->get("https://api.paystack.co/transaction/verify/" . $reference);

        if ($response->successful() && $response->json()['data']['status'] === 'success') {
            $data = $response->json()['data'];
            $orderId = $data['metadata']['order_id'] ?? null;

            if ($orderId) {
                $order = Order::find($orderId);
                if ($order) {
                    $order->update([
                        'payment_status' => 'paid',
                        'status' => 'processing'
                    ]);
                    
                    // Clear the cart on frontend redirection
                    return redirect()->route('collections')->with('success', 'Payment successful! Your order has been placed.');
                }
            }
        }

        return redirect()->route('checkout')->with('error', 'Payment verification failed.');
    }
}
