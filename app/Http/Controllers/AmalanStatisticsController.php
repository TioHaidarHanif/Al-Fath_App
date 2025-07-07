<?php

namespace App\Http\Controllers;

use App\Models\AmalanEntry;
use App\Models\AmalanQuestion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AmalanStatisticsController extends Controller
{
    /**
     * Display user statistics for amalan yaumiyah.
     */
    public function userStats()
    {
        $userId = Auth::id();
        
        // Get all active questions
        $questions = AmalanQuestion::where('is_active', true)->get();
        
        // Calculate completion rates
        $stats = [];
        
        // Overall completion rate
        $totalDays = Carbon::today()->diffInDays(Carbon::parse('2025-07-07')); // Adjust start date as needed
        $totalPossibleEntries = $totalDays * count($questions);
        $totalCompletedEntries = AmalanEntry::where('user_id', $userId)->count();
        
        $stats['overall'] = [
            'completion_rate' => $totalPossibleEntries > 0 ? ($totalCompletedEntries / $totalPossibleEntries) * 100 : 0,
            'total_entries' => $totalCompletedEntries,
        ];
        
        // Weekly stats
        $weekStart = Carbon::today()->startOfWeek();
        $weekEnd = Carbon::today()->endOfWeek();
        
        $weeklyEntries = AmalanEntry::where('user_id', $userId)
            ->whereBetween('entry_date', [$weekStart, $weekEnd])
            ->count();
            
        $weeklyPossibleEntries = Carbon::today()->diffInDays($weekStart) * count($questions);
        
        $stats['weekly'] = [
            'completion_rate' => $weeklyPossibleEntries > 0 ? ($weeklyEntries / $weeklyPossibleEntries) * 100 : 0,
            'total_entries' => $weeklyEntries,
            'start_date' => $weekStart->format('Y-m-d'),
            'end_date' => $weekEnd->format('Y-m-d'),
        ];
        
        // Monthly stats
        $monthStart = Carbon::today()->startOfMonth();
        $monthEnd = Carbon::today()->endOfMonth();
        
        $monthlyEntries = AmalanEntry::where('user_id', $userId)
            ->whereBetween('entry_date', [$monthStart, $monthEnd])
            ->count();
            
        $monthlyPossibleEntries = Carbon::today()->diffInDays($monthStart) * count($questions);
        
        $stats['monthly'] = [
            'completion_rate' => $monthlyPossibleEntries > 0 ? ($monthlyEntries / $monthlyPossibleEntries) * 100 : 0,
            'total_entries' => $monthlyEntries,
            'start_date' => $monthStart->format('Y-m-d'),
            'end_date' => $monthEnd->format('Y-m-d'),
        ];
        
        // Calculate streaks
        $currentStreak = 0;
        $maxStreak = 0;
        $lastDate = null;
        
        // Get all dates with entries
        $datesWithEntries = AmalanEntry::where('user_id', $userId)
            ->select(DB::raw('entry_date, COUNT(*) as count'))
            ->groupBy('entry_date')
            ->orderBy('entry_date', 'desc')
            ->get();
        
        // Map to get only dates with all questions answered
        $datesWithFullEntries = $datesWithEntries
            ->filter(function($date) use ($questions) {
                return $date->count >= count($questions);
            })
            ->pluck('entry_date')
            ->map(function($date) {
                return Carbon::parse($date);
            })
            ->toArray();
        
        // Calculate streaks
        if (!empty($datesWithFullEntries)) {
            $lastDate = $datesWithFullEntries[0];
            $currentStreak = 1;
            $maxStreak = 1;
            
            for ($i = 1; $i < count($datesWithFullEntries); $i++) {
                $currentDate = $datesWithFullEntries[$i];
                $diffDays = $lastDate->diffInDays($currentDate);
                
                if ($diffDays == 1) {
                    $currentStreak++;
                    $maxStreak = max($maxStreak, $currentStreak);
                } else if ($diffDays > 1) {
                    $currentStreak = 1;
                }
                
                $lastDate = $currentDate;
            }
        }
        
        $stats['streaks'] = [
            'current' => $currentStreak,
            'max' => $maxStreak,
        ];
        
        // Per-question stats
        $stats['questions'] = [];
        foreach ($questions as $question) {
            $questionEntries = AmalanEntry::where('user_id', $userId)
                ->where('amalan_question_id', $question->id)
                ->count();
                
            $stats['questions'][$question->id] = [
                'question' => $question->title,
                'completion_rate' => $totalDays > 0 ? ($questionEntries / $totalDays) * 100 : 0,
                'total_entries' => $questionEntries,
            ];
        }
        
        return Inertia::render('AmalanYaumiyah/Statistics', [
            'statistics' => $stats,
        ]);
    }
}
