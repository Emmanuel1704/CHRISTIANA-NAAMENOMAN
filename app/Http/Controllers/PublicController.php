<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Collection;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Welcome', [
            'featuredCollections' => Collection::latest()->take(3)->get(),
            'testimonials' => Testimonial::latest()->take(5)->get(),
        ]);
    }

    public function collections(): Response
    {
        return Inertia::render('Collections/Index', [
            'collections' => Collection::all()->groupBy('category'),
        ]);
    }

    public function bookingPage(): Response
    {
        return Inertia::render('Booking/Index');
    }

    public function contactPage(): Response
    {
        return Inertia::render('Contact');
    }
}
