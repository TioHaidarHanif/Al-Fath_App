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
    Route::post('/profile/details', [ProfileController::class, 'updateProfile'])->name('profile.update.details');
    Route::post('/profile/create', [ProfileController::class, 'storeProfile'])->name('profile.store.details');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    
    // Style Guide Route
    Route::get('/style-guide', function () {
        return Inertia::render('StyleGuide');
    })->name('style.guide');
    // Profile Management Routes
Route::post('profile-management/{profileManagement}', [\App\Http\Controllers\ProfileManagementController::class, 'update'])
    ->name('profile-management.update');
    Route::resource('profile-management', \App\Http\Controllers\ProfileManagementController::class);

    // QR Code Route
    Route::get('/profile/qrcode', function () {
        return Inertia::render('Profile/ShowQRCode');
    })->name('profile.qrcode');
});


// Only admins can access
Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::post('users/{user}', [\App\Http\Controllers\UserManagementController::class, 'update'])
    ->name('users.update');
    Route::get('/users/create', [\App\Http\Controllers\UserManagementController::class, 'create'])
    ->name('/users.create');
    Route::get('/users/{user}', [\App\Http\Controllers\UserManagementController::class, 'show'])
    ->name('/users.show');
    Route::resource('/users', \App\Http\Controllers\UserManagementController::class);
    Route::delete('/profile/{profile}', [\App\Http\Controllers\UserManagementController::class, 'destroyProfile'])->name('user-management.profile.destroy');
    Route::get('/logging', [\App\Http\Controllers\Admin\UserActivityController::class, 'index'])->name('admin.logging');
    // admin routes here
});

// Only members can access
Route::middleware(['auth'])->group(function () {
    // Event routes
    Route::get('/events/my-events', [App\Http\Controllers\EventController::class, 'myEvents'])->name('events.my');
    Route::get('/events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'create'])->name('events.register');
    Route::post('/events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'store'])->name('events.register.store');
    Route::delete('/events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'cancel'])->name('events.register.cancel');
    
    // Events (create only available to members)
    Route::get('/events/create', [App\Http\Controllers\EventController::class, 'create'])->name('events.create');
    Route::post('/events', [App\Http\Controllers\EventController::class, 'store'])->name('events.store');

    // PIC management (protected by event.pic middleware in the controller)
    Route::get('/events/{event}/pics', [App\Http\Controllers\EventController::class, 'managePics'])->name('events.pics');
    Route::post('/events/{event}/pics', [App\Http\Controllers\EventController::class, 'updatePics'])->name('events.pics.update');
    
    // Registration management (protected by event.pic middleware in the controller)
    Route::get('/events/{event}/registrations', [App\Http\Controllers\EventRegistrationController::class, 'index'])->name('events.registrations.index');
    Route::get('/events/{event}/registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'show'])->name('events.registrations.show');
    Route::post('/events/{event}/registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'update'])->name('events.registrations.update');
    Route::delete('/events/{event}/registrations/{registration}', [App\Http\Controllers\EventRegistrationController::class, 'destroy'])->name('events.registrations.destroy');
    Route::post('/events/{event}/registrations/batch', [App\Http\Controllers\EventRegistrationController::class, 'batchUpdate'])->name('events.registrations.batch');
});

// Public event routes
Route::get('/events', [App\Http\Controllers\EventController::class, 'index'])->name('events.index');
Route::get('/events/{event}', [App\Http\Controllers\EventController::class, 'show'])->name('events.show');

// Protected event routes
Route::middleware(['auth'])->group(function () {
    Route::get('/events/{event}/edit', [App\Http\Controllers\EventController::class, 'edit'])->name('events.edit');
    Route::post('/events/{event}', [App\Http\Controllers\EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [App\Http\Controllers\EventController::class, 'destroy'])->name('events.destroy');
});

require __DIR__.'/auth.php';
