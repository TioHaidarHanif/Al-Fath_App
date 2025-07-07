<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileDetailsUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->profile;
        Log::info('User profile accessed', [
            'user_id' => $user,
            'profile' => $profile ,
        ]);
        
        
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $profile,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }
    
    /**
     * Update the user's profile details.
     */
    public function updateProfile(ProfileDetailsUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $profile = $user->profile;
        
        // If profile doesn't exist, redirect to storeProfile
        if (!$profile) {
            return $this->storeProfile($request);
        }
        
        $validated = $request->validated();
        
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($profile->photo) {
                Storage::disk('public')->delete($profile->photo);
            }
            
            $path = $request->file('photo')->store('profile-photos', 'public');
            $validated['photo'] = $path;
        }
        
        $profile->update($validated);
        
        return Redirect::route('profile.edit')
            ->with('success', 'Profile updated successfully');
    }

    /**
     * Store a new profile for the user.
     */
    public function storeProfile(Request $request): RedirectResponse
    {
        $user = $request->user();
        
        // Validate request
        $validated = $request->validate([
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
        
        // Add user_id to validated data
        $validated['user_id'] = $user->id;
        
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profile-photos', 'public');
            $validated['photo'] = $path;
        }
        
        // Create profile
        Profile::create($validated);
        
        return Redirect::route('profile.edit')
            ->with('success', 'Profile created successfully');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
