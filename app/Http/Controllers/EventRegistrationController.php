<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventRegistrationController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
        // Only PICs and admins can manage registrations
        $this->middleware('event.pic')->only(['index', 'show', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Event $event)
    {
        // $this->authorize('managePics', $event);

        $registrations = $event->registrations()
            ->with('user.profile')
            ->get();

        return Inertia::render('Events/Registrations/Index', [
            'event' => $event,
            'registrations' => $registrations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Event $event)
    {
        // Check if user is already registered
        $existingRegistration = $event->registrations()
            ->where('user_id', Auth::id())
            ->first();

        if ($existingRegistration) {
            return redirect()->route('events.show', $event)
                ->with('info', 'You are already registered for this event.');
        }

        // Check if event is full
        if ($event->isFull()) {
            return redirect()->route('events.show', $event)
                ->with('error', 'This event is full.');
        }

        return Inertia::render('Events/Registrations/Create', [
            'event' => $event,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Event $event)
    {
        // Check if user is already registered
        $existingRegistration = $event->registrations()
            ->where('user_id', Auth::id())
            ->first();

        if ($existingRegistration) {
            return redirect()->route('events.show', $event)
                ->with('info', 'You are already registered for this event.');
        }

        // Check if event is full
        if ($event->isFull()) {
            return redirect()->route('events.show', $event)
                ->with('error', 'This event is full.');
        }

        $validated = $request->validate([
            'form_data' => 'required|array',
        ]);

        $registration = $event->registrations()->create([
            'user_id' => Auth::id(),
            'form_data' => $validated['form_data'],
            'status' => $event->auto_approve_registration ? 'approved' : 'pending',
        ]);

        return redirect()->route('events.show', $event)
            ->with('success', 'You have successfully registered for this event.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event, EventRegistration $registration)
    {
        // $this->authorize('managePics', $event);

        $registration->load('user.profile');

        return Inertia::render('Events/Registrations/Show', [
            'event' => $event,
            'registration' => $registration,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, EventRegistration $registration)
    {
        // $this->authorize('managePics', $event);

        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected,attended',
            'notes' => 'nullable|string',
        ]);

        $registration->update($validated);

        // If the request expects JSON (AJAX), return JSON
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'registration' => $registration->fresh()]);
        }

        return redirect()->route('events.registrations.index', [$event->id])
            ->with('success', 'Registration updated successfully.');
    }

    /**
     * Cancel a registration (by the registered user).
     */
    public function cancel(Event $event)
    {
        $registration = $event->registrations()
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $registration->delete();

        return redirect()->route('events.show', $event)
            ->with('success', 'Your registration has been cancelled.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event, EventRegistration $registration)
    {
        $this->authorize('managePics', $event);

        $registration->delete();

        return redirect()->route('events.registrations.index', $event)
            ->with('success', 'Registration deleted successfully.');
    }

    /**
     * Batch update registrations.
     */
    public function batchUpdate(Request $request, Event $event)
    {
        // $this->authorize('managePics', $event);

        $validated = $request->validate([
            'registrations' => 'required|array',
            'registrations.*.id' => 'required|exists:event_registrations,id',
            'registrations.*.status' => 'required|in:pending,approved,rejected,attended',
        ]);

        foreach ($validated['registrations'] as $registrationData) {
            $registration = EventRegistration::find($registrationData['id']);
            
            // Make sure the registration belongs to this event
            if ($registration->event_id === $event->id) {
                $registration->update([
                    'status' => $registrationData['status'],
                ]);
            }
        }

        return redirect()->route('events.registrations.index', $event)
            ->with('success', 'Registrations updated successfully.');
    }
}
