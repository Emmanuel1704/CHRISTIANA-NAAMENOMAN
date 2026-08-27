<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'posts' => Post::where('is_published', true)->latest()->get(),
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('Blog/Show', [
            'post' => Post::where('slug', $slug)->firstOrFail(),
        ]);
    }
}
