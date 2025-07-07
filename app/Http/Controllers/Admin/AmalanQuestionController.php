<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AmalanQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmalanQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = AmalanQuestion::orderBy('display_order')->get();
        
        return Inertia::render('Admin/AmalanQuestions/Index', [
            'questions' => $questions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AmalanQuestions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'input_type' => 'required|in:short_text,long_text,multiple_choice,checkbox',
            'options' => 'nullable|array',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);
        
        $question = AmalanQuestion::create($validated);
        
        return redirect()->route('admin.amalan-questions.index')
            ->with('success', 'Question created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AmalanQuestion $amalanQuestion)
    {
        return Inertia::render('Admin/AmalanQuestions/Show', [
            'question' => $amalanQuestion,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AmalanQuestion $amalanQuestion)
    {
        return Inertia::render('Admin/AmalanQuestions/Edit', [
            'question' => $amalanQuestion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AmalanQuestion $amalanQuestion)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'input_type' => 'required|in:short_text,long_text,multiple_choice,checkbox',
            'options' => 'nullable|array',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);
        
        $amalanQuestion->update($validated);
        
        return redirect()->route('admin.amalan-questions.index')
            ->with('success', 'Question updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AmalanQuestion $amalanQuestion)
    {
        $amalanQuestion->delete();
        
        return redirect()->route('admin.amalan-questions.index')
            ->with('success', 'Question deleted successfully.');
    }
    
    /**
     * View statistics for all users.
     */
    public function statistics()
    {
        // Get all questions
        $questions = AmalanQuestion::where('is_active', true)->get();
        
        // Get aggregated statistics - could be expanded based on requirements
        $stats = [];
        foreach ($questions as $question) {
            $stats[$question->id] = [
                'question' => $question->title,
                'total_entries' => $question->entries()->count(),
                'completion_rate' => $question->entries()->count() / \App\Models\User::count(),
                // Additional statistics can be added here
            ];
        }
        
        return Inertia::render('Admin/AmalanQuestions/Statistics', [
            'statistics' => $stats,
        ]);
    }
}
