<?php

namespace App\Http\Middleware;

use App\Models\Event;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EventPicMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the event from the route
        $event = $request->route('event');

        if (!$event instanceof Event) {
            // Try to find the event by ID
            $eventId = $request->route('event');
            if (is_numeric($eventId)) {
                $event = Event::find($eventId);
            }
        }

        if (!$event) {
            return redirect()->route('events.index')
                ->with('error', 'Event not found.');
        }

        // Check if the user is a PIC for this event or an admin
        if (!$event->isPic(Auth::user()) && !Auth::user()->isAdmin()) {
            return redirect()->route('events.show', $event)
                ->with('error', 'You are not authorized to perform this action.');
        }

        return $next($request);
    }
}
