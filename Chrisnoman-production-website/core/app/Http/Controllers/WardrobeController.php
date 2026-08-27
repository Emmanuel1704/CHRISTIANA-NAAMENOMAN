<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class WardrobeController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        
        // Fetch all bookings matching the authenticated user's email
        $bookings = \App\Models\Booking::where('email', $user->email)
            ->latest()
            ->get();

        return Inertia::render('MyWardrobe', [
            'user' => $user,
            'bookings' => $bookings,
            'savedDesigns' => $user->saved_designs ?? [],
        ]);
    }

    public function updateMeasurements(Request $request): RedirectResponse
    {
        $request->validate([
            'bust' => 'nullable|numeric|min:0|max:200',
            'waist' => 'nullable|numeric|min:0|max:200',
            'hips' => 'nullable|numeric|min:0|max:200',
            'underbust' => 'nullable|numeric|min:0|max:200',
            'shoulder' => 'nullable|numeric|min:0|max:100',
            'sleeve' => 'nullable|numeric|min:0|max:150',
            'length' => 'nullable|numeric|min:0|max:250',
        ]);

        $user = Auth::user();
        $user->update($request->only([
            'bust', 'waist', 'hips', 'underbust', 'shoulder', 'sleeve', 'length'
        ]));

        return redirect()->back()->with('success', 'Your atelier measurement blueprint has been updated.');
    }

    public function saveDesign(Request $request): RedirectResponse
    {
        $request->validate([
            'neckline' => 'required|string',
            'silhouette' => 'required|string',
            'sleeves' => 'required|string',
            'fabric' => 'required|string',
        ]);

        $user = Auth::user();
        $designs = $user->saved_designs ?? [];
        
        // Append new design
        $designs[] = [
            'id' => uniqid(),
            'neckline' => $request->neckline,
            'silhouette' => $request->silhouette,
            'sleeves' => $request->sleeves,
            'fabric' => $request->fabric,
            'created_at' => date('Y-m-d H:i:s'),
        ];

        $user->saved_designs = $designs;
        $user->save();

        return redirect()->back()->with('success', 'Design saved to your private wardrobe!');
    }

    public function deleteDesign($id): RedirectResponse
    {
        $user = Auth::user();
        $designs = $user->saved_designs ?? [];
        
        // Filter out the design
        $designs = array_values(array_filter($designs, function($d) use ($id) {
            return $d['id'] !== $id;
        }));

        $user->saved_designs = $designs;
        $user->save();

        return redirect()->back()->with('success', 'Design removed from wardrobe.');
    }
}
