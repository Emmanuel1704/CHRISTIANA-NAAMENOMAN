<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsletterSubscriber;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SubscriberController extends Controller
{
    public function index(): Response
    {
        $subscribers = NewsletterSubscriber::orderBy('created_at', 'desc')->paginate(15);
        
        return Inertia::render('Admin/Subscribers/Index', [
            'subscribers' => $subscribers
        ]);
    }

    public function destroy(NewsletterSubscriber $subscriber): RedirectResponse
    {
        $subscriber->delete();
        return redirect()->back()->with('success', 'Subscriber removed successfully.');
    }
}
