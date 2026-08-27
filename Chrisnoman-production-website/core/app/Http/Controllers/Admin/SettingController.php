<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => Setting::pluck('value', 'key')->all(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'designer_name' => 'required|string|max:255',
            'designer_bio' => 'required|string',
            'designer_image' => 'nullable|image|max:3072', // Up to 3MB
        ]);

        Setting::updateOrCreate(['key' => 'designer_name'], ['value' => $request->designer_name]);
        Setting::updateOrCreate(['key' => 'designer_bio'], ['value' => $request->designer_bio]);

        if ($request->hasFile('designer_image')) {
            // Delete old file if present
            $oldImage = Setting::where('key', 'designer_image')->value('value');
            if ($oldImage && !str_contains($oldImage, '/designer/designer_1.jpg')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $oldImage));
            }

            $path = $request->file('designer_image')->store('designer', 'public');
            Setting::updateOrCreate(['key' => 'designer_image'], ['value' => '/storage/' . $path]);
        }

        return redirect()->back()->with('success', 'Designer settings updated successfully.');
    }
}
