<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function __construct()
    {
        
    }
    public function show(User $user){
        // return $user;
        $user->load('profile');
        return Inertia::render('UserManagement/Show', [
            'user' => $user
        ]);
    }
    // List all users with their profiles
    public function index()
    {
        $users = User::with('profile')->paginate(15);
        return Inertia::render('UserManagement/Index', [
            'users' => $users
        ]);
    }
  

    // Show form to create a new user (with or without profile)
    public function create()
    {

        return Inertia::render('UserManagement/Create');
    }

    // Store a new user (optionally with profile)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'qr_code' => uniqid('qr_', true),
        ]);
        // Optionally create profile
        if ($request->has('profile')) {
            $profileData = $request->validate([
                'profile.nim' => 'required|string|unique:profiles,nim',
                'profile.fakultas' => 'required|string',
                'profile.prodi' => 'required|string',
                'profile.angkatan' => 'required|integer|min:2000|max:' . (date('Y') + 1),
                'profile.amanah' => 'required|string',
                'profile.jenis_kelamin' => 'required|in:Ikhwan,Akhwat',
                'profile.divisi' => 'required|string',
                'profile.posisi' => 'required|in:Fakultas,Pusat',
                'profile.photo' => 'nullable|image|max:2048',
            ]);
            $profileData = $profileData['profile'];
            $profileData['user_id'] = $user->id;
            if ($request->file('profile.photo')) {
                $profileData['photo'] = $request->file('profile.photo')->store('profile-photos', 'public');
            }
            Profile::create($profileData);
        }
        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    // Show form to edit a user
    public function edit(User $user)
    {
        $user->load('profile');
        return Inertia::render('UserManagement/Edit', [
            'user' => $user
        ]);
    }

    // Update a user (and optionally their profile)
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|string',
        ]);
        $user->update($validated);
        // Optionally update or create profile
        if ($request->has('profile')) {
            $profileData = $request->validate([
                'profile.nim' => 'required|string|unique:profiles,nim,' . ($user->profile->id ?? 'NULL'),
                'profile.fakultas' => 'required|string',
                'profile.prodi' => 'required|string',
                'profile.angkatan' => 'required|integer|min:2000|max:' . (date('Y') + 1),
                'profile.amanah' => 'required|string',
                'profile.jenis_kelamin' => 'required|in:Ikhwan,Akhwat',
                'profile.divisi' => 'required|string',
                'profile.posisi' => 'required|in:Fakultas,Pusat',
                'profile.photo' => 'nullable|image|max:2048',
            ]);
            $profileData = $profileData['profile'];
            $profileData['user_id'] = $user->id;
            if ($request->file('profile.photo')) {
                $profileData['photo'] = $request->file('profile.photo')->store('profile-photos', 'public');
            }
            if ($user->profile) {
                $user->profile->update($profileData);
            } else {
                Profile::create($profileData);
            }
        }
        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    // Delete a user (and their profile)
    public function destroy(User $user)
    {
        if ($user->profile && $user->profile->photo) {
            Storage::disk('public')->delete($user->profile->photo);
        }
        $user->delete();
        return redirect()->route('user-management.index')->with('success', 'User deleted successfully');
    }

    // Delete only a profile (not the user)
    public function destroyProfile(Profile $profile)
    {
        if ($profile->photo) {
            Storage::disk('public')->delete($profile->photo);
        }
        $profile->delete();
        return redirect()->back()->with('success', 'Profile deleted successfully');
    }
}
