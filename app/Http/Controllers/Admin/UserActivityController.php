<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserActivity;
use App\Models\User;
use Inertia\Inertia;

class UserActivityController extends Controller
{
    public function index(Request $request)
    {
        $query = UserActivity::with('user');

        // Filtering
        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }
        if ($request->start_date) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->end_date) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        // Search by action or resource
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('action', 'like', '%'.$request->search.'%')
                  ->orWhere('resource_type', 'like', '%'.$request->search.'%');
            });
        }

        $logs = $query->latest()->paginate(20)->withQueryString();

        // Statistics
        $totalActions = UserActivity::count();
        $actionsPerUser = UserActivity::selectRaw('user_id, count(*) as count')
            ->groupBy('user_id')->with('user')->get();
        $actionsPerDay = UserActivity::selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')->orderBy('date', 'desc')->get();

        $users = User::orderBy('name')->get();

        return Inertia::render('Admin/LoggingDashboard', [
            'logs' => $logs,
            'users' => $users,
            'filters' => $request->only(['user_id', 'start_date', 'end_date', 'search']),
            'stats' => [
                'totalActions' => $totalActions,
                'actionsPerUser' => $actionsPerUser,
                'actionsPerDay' => $actionsPerDay,
            ],
        ]);
    }
}
