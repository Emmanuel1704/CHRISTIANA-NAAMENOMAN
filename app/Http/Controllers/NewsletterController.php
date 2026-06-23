<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;

class NewsletterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email',
        ]);

        NewsletterSubscriber::create(['email' => $request->email]);

        return redirect()->back()->with('success', 'You have been subscribed to our fashion journal!');
    }
}
