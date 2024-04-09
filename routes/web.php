<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TanyaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/@{page}', [TanyaController::class, 'index'])->name('tanya');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/page/{page}/question', [TanyaController::class, 'newQuestion'])->name('question.new');

    Route::resource('dashboard/page', PageController::class)->only(['index', 'update'])->names('page');
    Route::post("/profile/picture", [PageController::class, 'updateProfilePicture'])->name('profile.picture');
    Route::post("/page/banner", [PageController::class, 'updatePageBanner'])->name('page.banner');
    Route::put('/page/settings', [PageController::class, 'updateSettings'])->name('page.settings');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
