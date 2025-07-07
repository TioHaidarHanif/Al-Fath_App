<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
        // Only members and admins can create events
        // $this->middleware('role:member|admin')->only(['create', 'store']);
        // Only PICs and admins can edit, update, and delete events
        $this->middleware('event.pic')->only(['edit', 'update', 'destroy', 'managePics', 'updatePics']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::with('creator')
            ->withCount('registrations')
            ->where('is_active', true);

        // Apply filters
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->filled('date_from')) {
            $query->where('start_time', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('start_time', '<=', $request->date_to);
        }

        // Determine sort order
        $sortField = $request->input('sort', 'start_time');
        $sortDirection = $request->input('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $events = $query->paginate(12)->withQueryString();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'filters' => $request->only(['search', 'location', 'date_from', 'date_to', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'image' => 'nullable|image|max:2048',
            'max_participants' => 'nullable|integer|min:1',
            'auto_approve_registration' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image_path'] = $path;
        }

        // Create the event
        $event = Event::create([
            ...$validated,
            'creator_id' => Auth::id(),
        ]);

        // Add the creator as a PIC
        $event->pics()->attach(Auth::id(), ['is_creator' => true]);

        return redirect()->route('events.show', $event)
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load(['creator', 'pics', 'registrations.user']);
        $userRegistration = null;
        
        if (Auth::check()) {
            $userRegistration = $event->registrations()
                ->where('user_id', Auth::id())
                ->first();
        }

        $isPic = $event->isPic(Auth::user());
        $isCreator = $event->isCreator(Auth::user());

        return Inertia::render('Events/Show', [
            'event' => $event,
            'userRegistration' => $userRegistration,
            'isPic' => $isPic,
            'isCreator' => $isCreator,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Events/Edit', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'image' => 'nullable|image|max:2048',
            'max_participants' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
            'auto_approve_registration' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($event->image_path) {
                Storage::disk('public')->delete($event->image_path);
            }
            
            $path = $request->file('image')->store('events', 'public');
            $validated['image_path'] = $path;
        }

        $event->update($validated);

        return redirect()->route('events.show', $event)
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Check if user is creator or admin
        if (!$event->isCreator(Auth::user()) && !Auth::user()->isAdmin()) {
            return redirect()->back()->with('error', 'You are not authorized to delete this event.');
        }

        // Delete the event image if it exists
        if ($event->image_path) {
            Storage::disk('public')->delete($event->image_path);
        }

        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }

    /**
     * Show the form for managing PICs.
     */
    public function managePics(Event $event)
    {
        // Only the creator can manage PICs
        if (!$event->isCreator(Auth::user()) && !Auth::user()->isAdmin()) {
            return redirect()->back()->with('error', 'Only the event creator can manage PICs.');
        }

        $event->load('pics');
        
        // Get all users that could be PICs (excluding current PICs)
        $currentPicIds = $event->pics->pluck('id')->toArray();
        $availableUsers = User::whereNotIn('id', $currentPicIds)->get();

        return Inertia::render('Events/ManagePics', [
            'event' => $event,
            'availableUsers' => $availableUsers,
        ]);
    }

    /**
     * Update the PICs for the event.
     */
    public function updatePics(Request $request, Event $event)
    {
        // Only the creator can manage PICs
        if (!$event->isCreator(Auth::user()) && !Auth::user()->isAdmin()) {
            return redirect()->back()->with('error', 'Only the event creator can manage PICs.');
        }

        $validated = $request->validate([
            'pic_ids' => 'array',
            'pic_ids.*' => 'exists:users,id',
        ]);

        // Get the current PICs
        $currentPics = $event->pics()->where('is_creator', false)->get();
        $currentPicIds = $currentPics->pluck('id')->toArray();
        
        // Determine which PICs to add and which to remove
        $newPicIds = $validated['pic_ids'] ?? [];
        $picsToAdd = array_diff($newPicIds, $currentPicIds);
        $picsToRemove = array_diff($currentPicIds, $newPicIds);

        // Add new PICs
        foreach ($picsToAdd as $userId) {
            $event->pics()->attach($userId, ['is_creator' => false]);
        }

        // Remove PICs
        $event->pics()->detach($picsToRemove);

        return redirect()->route('events.show', $event)
            ->with('success', 'Event PICs updated successfully.');
    }

    /**
     * Display a listing of the user's events.
     */
    public function myEvents()
    {
        $createdEvents = Auth::user()->createdEvents()->with('creator')->get();
        $managedEvents = Auth::user()->managedEvents()->with('creator')->get();
        $registeredEvents = Auth::user()->registeredEvents()->with('creator')->get();

        return Inertia::render('Events/MyEvents', [
            'createdEvents' => $createdEvents,
            'managedEvents' => $managedEvents,
            'registeredEvents' => $registeredEvents,
        ]);
    }
}
