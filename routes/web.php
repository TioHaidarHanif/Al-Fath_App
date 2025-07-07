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
      Route::resource('amalan-yaumiyah', \App\Http\Controllers\AmalanEntryController::class);
    Route::get('amalan-yaumiyah-bulk', [\App\Http\Controllers\AmalanEntryController::class, 'bulkEntry'])->name('amalan-yaumiyah.bulk');
    Route::post('amalan-yaumiyah-bulk', [\App\Http\Controllers\AmalanEntryController::class, 'storeBulk'])->name('amalan-yaumiyah.storeBulk');
    Route::post('amalan-yaumiyah-bulk-day', [\App\Http\Controllers\AmalanEntryController::class, 'storeBulkDay'])->name('amalan-yaumiyah.storeBulkDay');
    Route::get('amalan-statistics', [\App\Http\Controllers\AmalanStatisticsController::class, 'userStats'])->name('amalan-statistics');
    // Profile Management Routes
Route::post('profile-management/{profileManagement}', [\App\Http\Controllers\ProfileManagementController::class, 'update'])
    ->name('profile-management.update');
    Route::resource('profile-management', \App\Http\Controllers\ProfileManagementController::class);
});


// Only admins can access
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/logging', [\App\Http\Controllers\Admin\UserActivityController::class, 'index'])->name('admin.logging');
    
    // Amalan Yaumiyah Management for Admins
    Route::resource('admin/amalan-questions', \App\Http\Controllers\Admin\AmalanQuestionController::class, ['as' => 'admin']);
    Route::get('admin/amalan-statistics', [\App\Http\Controllers\Admin\AmalanQuestionController::class, 'statistics'])->name('admin.amalan-statistics');
});

// Only members can access
Route::middleware(['auth', 'role:member'])->group(function () {
    // Amalan Yaumiyah for Members
  
});

require __DIR__.'/auth.php';
