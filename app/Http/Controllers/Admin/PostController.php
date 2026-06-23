<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Blog/Index', [
            'posts' => \App\Models\Post::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blog/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog', 'public');
            $imagePath = '/storage/' . $path;
        }

        \App\Models\Post::create([
            'title' => $request->title,
            'slug' => \Illuminate\Support\Str::slug($request->title) . '-' . time(),
            'excerpt' => $request->excerpt ?? \Illuminate\Support\Str::limit(strip_tags($request->content), 150),
            'content' => $request->content,
            'featured_image' => $imagePath,
        ]);

        return redirect()->route('posts.index')->with('success', 'Blog post created successfully.');
    }

    public function edit(\App\Models\Post $post): Response
    {
        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, \App\Models\Post $post): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'content', 'excerpt']);
        
        if ($request->hasFile('image')) {
            if ($post->featured_image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $post->featured_image));
            }
            $path = $request->file('image')->store('blog', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        $post->update($data);

        return redirect()->route('posts.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy(\App\Models\Post $post): RedirectResponse
    {
        if ($post->featured_image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $post->featured_image));
        }
        $post->delete();
        return redirect()->back()->with('success', 'Blog post deleted successfully.');
    }
}
