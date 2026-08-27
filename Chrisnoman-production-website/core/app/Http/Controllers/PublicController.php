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
            'featuredCollections' => \App\Models\Collection::latest()->take(3)->get(),
            'testimonials' => Testimonial::latest()->take(5)->get(),
            'settings' => \App\Models\Setting::pluck('value', 'key')->all(),
        ]);
    }

    public function collections(): Response
    {
        $swatchBox = new Collection([
            'id' => 9999,
            'title' => 'Luxury Swatch Box',
            'category' => 'Accessories',
            'description' => 'A curated selection of physical premium fabric swatches including Handwoven Royal Kente, Beaded French Lace, Duchess Satin, and Metallic Brocade to touch and coordinate before locking in your fitting designs.',
            'price' => 150,
            'currency' => 'GHS',
            'stock_status' => 'in_stock',
            'image_path' => '/assets/images/african.png',
        ]);

        $items = Collection::all();
        $items->push($swatchBox);

        return Inertia::render('Collections/Index', [
            'collections' => $items->groupBy('category'),
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
