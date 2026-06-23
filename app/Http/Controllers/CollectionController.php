<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Collection;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class CollectionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Collections/Index', [
            'collections' => Collection::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Collections/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('collections', 'public');

        Collection::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'price' => $request->price,
            'image_path' => '/storage/' . $path,
        ]);

        return redirect()->route('collections.index')->with('success', 'Collection item created successfully.');
    }

    public function edit(Collection $collection): Response
    {
        return Inertia::render('Admin/Collections/Edit', [
            'collection' => $collection,
        ]);
    }

    public function update(Request $request, Collection $collection): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'category', 'description', 'price']);

        if ($request->hasFile('image')) {
            // Delete old image
            Storage::disk('public')->delete(str_replace('/storage/', '', $collection->image_path));
            $path = $request->file('image')->store('collections', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $collection->update($data);

        return redirect()->route('collections.index')->with('success', 'Collection item updated successfully.');
    }

    public function destroy(Collection $collection): RedirectResponse
    {
        Storage::disk('public')->delete(str_replace('/storage/', '', $collection->image_path));
        $collection->delete();

        return redirect()->route('collections.index')->with('success', 'Collection item deleted successfully.');
    }
}
