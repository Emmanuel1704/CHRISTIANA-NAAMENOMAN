<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SitemapController;
Route::get('/sitemap.xml', [SitemapController::class, 'index']);

use App\Http\Controllers\PublicController;

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');

use App\Http\Controllers\OrderController;
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

use App\Http\Controllers\PostController;
Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [PostController::class, 'show'])->name('blog.show');

Route::get('/size-guide', function () {
    return Inertia::render('SizeGuide');
})->name('size-guide');

use App\Http\Controllers\NewsletterController;
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.subscribe');

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/collections', [PublicController::class, 'collections'])->name('collections');
Route::get('/book', [PublicController::class, 'bookingPage'])->name('book');
Route::post('/book', [App\Http\Controllers\BookingController::class, 'store'])->name('book.store');
Route::get('/contact', [PublicController::class, 'contactPage'])->name('contact');
use App\Http\Controllers\MessageController;
Route::post('/contact', [MessageController::class, 'store'])->name('contact.store');
use App\Models\Collection;
use App\Models\Booking;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalCollections' => Collection::count(),
            'totalBookings' => Booking::count(),
            'pendingBookings' => Booking::where('status', 'pending')->count(),
            'unreadMessages' => \App\Models\Message::where('is_read', false)->count(),
            'totalRevenue' => App\Models\Order::sum('total_amount'),
            'totalSubscribers' => \App\Models\NewsletterSubscriber::count(),
        ],
        'salesData' => collect(range(6, 0))->map(function ($days) {
            $date = now()->subDays($days);
            return [
                'name' => $date->format('D'), // e.g., 'Mon', 'Tue'
                'sales' => (float) \App\Models\Order::whereDate('created_at', $date)->sum('total_amount'),
            ];
        })->values()->all(),
        'recentBookings' => Booking::latest()->take(5)->get(),
        'recentMessages' => \App\Models\Message::latest()->take(5)->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\SubscriberController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin CRUD
    Route::resource('admin/collections', CollectionController::class);
    Route::resource('admin/bookings', BookingController::class);
    Route::resource('admin/testimonials', TestimonialController::class);
    Route::resource('admin/orders', OrderController::class);
    Route::resource('admin/posts', \App\Http\Controllers\Admin\PostController::class);
    Route::resource('admin/messages', MessageController::class);
    Route::resource('admin/subscribers', SubscriberController::class);
});

require __DIR__.'/auth.php';
