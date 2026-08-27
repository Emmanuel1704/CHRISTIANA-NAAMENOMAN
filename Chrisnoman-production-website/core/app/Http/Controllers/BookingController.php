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
            'email' => 'nullable|email|max:255',
            'service' => 'required|string',
            'fabric_option' => 'required|string',
            'fabric_image' => 'nullable|image|max:2048',
            'style_image' => 'nullable|image|max:2048',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $fabricPath = null;
        $stylePath = null;

        if ($request->hasFile('fabric_image')) {
            $path = $request->file('fabric_image')->store('bookings', 'public');
            $fabricPath = '/storage/' . $path;
        }

        if ($request->hasFile('style_image')) {
            $path = $request->file('style_image')->store('bookings', 'public');
            $stylePath = '/storage/' . $path;
        }

        Booking::create([
            'customer_name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email ?? 'N/A',
            'service_type' => $request->service,
            'fabric_option' => $request->fabric_option,
            'fabric_image_path' => $fabricPath,
            'style_image_path' => $stylePath,
            'appointment_date' => $request->date,
            'status' => 'pending',
            'notes' => $request->notes,
        ]);

        return redirect()->back()->with('success', 'Booking submitted successfully.');
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $request->validate([
            'status' => 'nullable|string|in:pending,approved,rejected,completed',
            'production_stage' => 'nullable|string|in:pending,confirmed,pattern_drafting,fitting_scheduled,embellishing,ready_for_pickup,completed',
        ]);

        $updates = [];
        if ($request->has('status')) {
            $updates['status'] = $request->status;
        }
        if ($request->has('production_stage')) {
            $updates['production_stage'] = $request->production_stage;
        }

        $booking->update($updates);

        return redirect()->back()->with('success', "Booking status and stage updated.");
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();
        return redirect()->back()->with('success', 'Booking deleted successfully.');
    }
}
