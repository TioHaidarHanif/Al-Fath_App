<?php

namespace App\Http\Controllers;

use App\Models\AmalanEntry;
use App\Models\AmalanQuestion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;
class AmalanEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get the selected date or default to today
        $date = $request->input('date') ? Carbon::parse($request->input('date')) : Carbon::today();
        
        // Make sure we don't allow future dates
        if ($date->isAfter(Carbon::today())) {
            $date = Carbon::today();
        }
        
        // Get all active questions
        $questions = AmalanQuestion::where('is_active', true)
            ->orderBy('display_order')
            ->get();
            
        // Get the user's entries for the selected date
        $entries = AmalanEntry::where('user_id', Auth::id())
            ->where('entry_date', $date->format('Y-m-d'))
            ->get()
            ->keyBy('amalan_question_id');
            
        return Inertia::render('AmalanYaumiyah/Index', [
            'questions' => $questions,
            'entries' => $entries,
            'selectedDate' => $date->format('Y-m-d'),
            'today' => Carbon::today()->format('Y-m-d'),
        ]);
    }

    /**
     * Show form for bulk entry mode
     */
    public function bulkEntry()
    {
        // Get all active questions
        $questions = AmalanQuestion::where('is_active', true)
            ->orderBy('display_order')
            ->get();
            
        // Get the last 7 days
        $dates = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $dates[] = $date->format('Y-m-d');
        }
        
        // Get the user's entries for these dates
        $entries = AmalanEntry::where('user_id', Auth::id())
            ->whereIn('entry_date', $dates)
            ->get();
            
        // Organize entries by date and question
        $organizedEntries = [];
        foreach ($dates as $date) {
            $organizedEntries[$date] = [];
            foreach ($questions as $question) {
                $entry = $entries->first(function ($entry) use ($date, $question) {
                    return $entry->entry_date->format('Y-m-d') === $date && 
                           $entry->amalan_question_id === $question->id;
                });
                
                $organizedEntries[$date][$question->id] = $entry ? $entry->value : null;
            }
        }
        
        return Inertia::render('AmalanYaumiyah/BulkEntry', [
            'questions' => $questions,
            'dates' => $dates,
            'entries' => $organizedEntries,
        ]);
    }

    /**
     * Store multiple entries at once (bulk mode)
     */
    public function storeBulk(Request $request)
    {
        $validated = $request->validate([
            'entries' => 'required|array',
            'entries.*.date' => 'required|date|before_or_equal:today',
            'entries.*.question_id' => 'required|exists:amalan_questions,id',
            'entries.*.value' => 'required|string',
        ]);
        
        foreach ($validated['entries'] as $entry) {
            $entry['date'] = Carbon::parse($entry['date'])->format('Y-m-d');
            AmalanEntry::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'amalan_question_id' => $entry['question_id'],
                    'entry_date' => $entry['date'],
                ],
                [
                    'value' => $entry['value'],
                ]
            );
        }
        
        return redirect()->route('amalan-yaumiyah.index')
            ->with('success', 'Entries saved successfully.');
    }

    /**
     * Store multiple entries for a single day (bulk mode)
     */
    public function storeBulkDay(Request $request)
    {
        $validated = $request->validate([
            'entry_date' => 'required|date|before_or_equal:today',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:amalan_questions,id',
            'answers.*.value' => 'required|string',
        ]);

        // Force entry_date to Y-m-d format
        $validated['entry_date'] = Carbon::parse($validated['entry_date'])->format('Y-m-d');

        // Check for duplicate question_id in answers
        $ids = array_map(fn($a) => $a['question_id'], $validated['answers']);
        if (count($ids) !== count(array_unique($ids))) {
            return back()->withErrors(['answers' => 'Duplicate questions detected in submission. Please refresh and try again.']);
        }

        \DB::transaction(function () use ($validated) {
            foreach ($validated['answers'] as $answer) {
                AmalanEntry::updateOrCreate(
                    [
                        'user_id' => Auth::id(),
                        'amalan_question_id' => $answer['question_id'],
                        'entry_date' => $validated['entry_date'],
                    ],
                    [
                        'value' => $answer['value'],
                    ]
                );
            }
        });

        return redirect()->route('amalan-yaumiyah.index', ['date' => $validated['entry_date']])
            ->with('success', 'Entries saved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_id' => 'required|exists:amalan_questions,id',
            'entry_date' => 'required|date|before_or_equal:today',
            'value' => 'required|string',
        ]);
        
        $validated['user_id'] = Auth::id();
        $validated['entry_date'] = Carbon::parse($validated['entry_date'])->format('Y-m-d');

        // Use updateOrCreate to handle the case where an entry already exists
        AmalanEntry::updateOrCreate(
            [
                'user_id' => $validated['user_id'],
                'amalan_question_id' => $validated['question_id'],
                'entry_date' => $validated['entry_date'],
            ],
            [
                'value' => $validated['value'],
            ]
        );
        
        return redirect()->back()->with('success', 'Entry saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AmalanEntry $amalanEntry)
    {
        // Ensure the entry belongs to the authenticated user
        $this->authorize('view', $amalanEntry);
        
        return Inertia::render('AmalanYaumiyah/Show', [
            'entry' => $amalanEntry->load('question'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AmalanEntry $amalanEntry)
    {
        // Ensure the entry belongs to the authenticated user
        $this->authorize('update', $amalanEntry);
        
        // Ensure the entry is not for a future date
        if ($amalanEntry->entry_date->isAfter(Carbon::today())) {
            return redirect()->route('amalan-yaumiyah.index')
                ->with('error', 'Cannot edit future entries.');
        }
        
        return Inertia::render('AmalanYaumiyah/Edit', [
            'entry' => $amalanEntry->load('question'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AmalanEntry $amalanEntry)
    {
        // Ensure the entry belongs to the authenticated user
        $this->authorize('update', $amalanEntry);
        
        // Ensure the entry is not for a future date
        if ($amalanEntry->entry_date->isAfter(Carbon::today())) {
            return redirect()->route('amalan-yaumiyah.index')
                ->with('error', 'Cannot edit future entries.');
        }
        
        $validated = $request->validate([
            'value' => 'required|string',
        ]);
        
        $amalanEntry->update($validated);
        
        return redirect()->route('amalan-yaumiyah.index', ['date' => $amalanEntry->entry_date->format('Y-m-d')])
            ->with('success', 'Entry updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AmalanEntry $amalanEntry)
    {
        // Ensure the entry belongs to the authenticated user
        $this->authorize('delete', $amalanEntry);
        
        // Ensure the entry is not for a future date
        if ($amalanEntry->entry_date->isAfter(Carbon::today())) {
            return redirect()->route('amalan-yaumiyah.index')
                ->with('error', 'Cannot delete future entries.');
        }
        
        $amalanEntry->delete();
        
        return redirect()->route('amalan-yaumiyah.index')
            ->with('success', 'Entry deleted successfully.');
    }
}
