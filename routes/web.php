<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Style Guide Route
    Route::get('/style-guide', function () {
        return Inertia::render('StyleGuide');
    })->name('style.guide');
    // Profile Management Routes
Route::post('profile-management/{profileManagement}', [\App\Http\Controllers\ProfileManagementController::class, 'update'])
    ->name('profile-management.update');
    Route::resource('profile-management', \App\Http\Controllers\ProfileManagementController::class);
});


// Only admins can access
Route::middleware(['auth', 'role:admin'])->group(function () {
    
    // admin routes here
});

// Only members can access
Route::middleware(['auth', 'role:member'])->group(function () {
    // member routes here
});

require __DIR__.'/auth.php';
