<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Booking;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class BookingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'service' => 'required|string',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        Booking::create([
            'customer_name' => $request->name,
            'phone' => $request->phone,
            'email' => 'N/A', // Assuming email is optional/not collected
            'service_type' => $request->service,
            'appointment_date' => $request->date,
            'status' => 'pending',
            'notes' => $request->notes,
        ]);

        return redirect()->back()->with('success', 'Booking submitted successfully.');
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,rejected,completed',
        ]);

        $booking->update(['status' => $request->status]);

        return redirect()->back()->with('success', "Booking status updated to {$request->status}.");
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();
        return redirect()->back()->with('success', 'Booking deleted successfully.');
    }
}
