<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profiles = Profile::with('user')->paginate(10);
        
        return Inertia::render('ProfileManagement/Index', [
            'profiles' => $profiles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get users without profiles for dropdown
        $availableUsers = User::whereDoesntHave('profile')->get();
        
        return Inertia::render('ProfileManagement/Create', [
            'availableUsers' => $availableUsers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:profiles,user_id',
            'nim' => 'required|string|unique:profiles',
            'fakultas' => 'required|string',
            'prodi' => 'required|string',
            'angkatan' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'amanah' => 'required|string',
            'jenis_kelamin' => 'required|in:Ikhwan,Akhwat',
            'divisi' => 'required|string',
            'posisi' => 'required|in:Fakultas,Pusat',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profile-photos', 'public');
            $validated['photo'] = $path;
        }

        $profile = Profile::create($validated);

        return redirect()->route('profile-management.index')
            ->with('success', 'Profile created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profileManagement)
    {
        $profileManagement->load('user');
        
        return Inertia::render('ProfileManagement/Show', [
            'profile' => $profileManagement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profileManagement)
    {
        $profileManagement->load('user');
        
        return Inertia::render('ProfileManagement/Edit', [
            'profile' => $profileManagement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profile $profileManagement)
    {
        $validated = $request->validate([
            'nim' => 'required|string|unique:profiles,nim,' . $profileManagement->id,
            'fakultas' => 'required|string',
            'prodi' => 'required|string',
            'angkatan' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'amanah' => 'required|string',
            'jenis_kelamin' => 'required|in:Ikhwan,Akhwat',
            'divisi' => 'required|string',
            'posisi' => 'required|in:Fakultas,Pusat',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($profileManagement->photo) {
                Storage::disk('public')->delete($profileManagement->photo);
            }
            
            $path = $request->file('photo')->store('profile-photos', 'public');
            $validated['photo'] = $path;
        }

        $profileManagement->update($validated);

        return redirect()->route('profile-management.index')
            ->with('success', 'Profile updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profileManagement)
    {
        // Delete photo if exists
        if ($profileManagement->photo) {
            Storage::disk('public')->delete($profileManagement->photo);
        }
        
        $profileManagement->delete();

        return redirect()->route('profile-management.index')
            ->with('success', 'Profile deleted successfully');
    }
}
