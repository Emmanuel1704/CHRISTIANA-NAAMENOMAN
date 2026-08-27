<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Review;
use Illuminate\Http\RedirectResponse;

class ReviewController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'collection_id' => 'required|exists:collections,id',
            'customer_name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        Review::create($request->all());

        return redirect()->back()->with('success', 'Thank you! Your review has been submitted.');
    }
}
