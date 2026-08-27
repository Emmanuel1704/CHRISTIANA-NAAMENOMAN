<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Message;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        Message::create($validated);

        return back()->with('success', 'Your message has been sent successfully! We will get back to you soon.');
    }

    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages
        ]);
    }

    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'is_read' => 'required|boolean'
        ]);
        $message->update($validated);
        return back()->with('success', 'Message status updated.');
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return back()->with('success', 'Message deleted successfully.');
    }
}
