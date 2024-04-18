<?php

use App\Events\SendMessageEvent;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\OverlaySettingsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TanyaController;
use App\Http\Controllers\UserSettingController;
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

Route::get("/test", function () {
    event(new SendMessageEvent(message: "test"));
    return "done";
});

Route::get('/@{page}', [TanyaController::class, 'index'])->name('tanya');
Route::get('/overlay/{key}', [TanyaController::class, 'overlay'])->name('overlay');
Route::get('/explore', [ExploreController::class, 'index'])->name('explore');

Route::middleware('auth')->group(function () {
    Route::get('/self/questions', [DashboardController::class, 'getQuestions'])->name('dashboard.getQuestions');

    Route::post('/page/{page}/question', [TanyaController::class, 'newQuestion'])->name('question.new');

    Route::resource('dashboard/page', PageController::class)->only(['index', 'update'])->names('page');
    Route::post("/profile/picture", [PageController::class, 'updateProfilePicture'])->name('profile.picture');
    Route::post("/page/banner", [PageController::class, 'updatePageBanner'])->name('page.banner');
    Route::put('/page/settings', [PageController::class, 'updateSettings'])->name('page.settings');

    Route::post('/dashboard/settings/email', [UserSettingController::class, 'changeEmail'])->name('dashboard.setting.email');
    Route::post('/dashboard/settings/notification', [UserSettingController::class, 'notificationSetting'])->name('dashboard.setting.notification');
    Route::post('/dashboard/settings/password', [UserSettingController::class, 'changePassword'])->name('dashboard.setting.password');
    Route::get('/dashboard/settings', [UserSettingController::class, 'index'])->name('dashboard.setting');

    Route::get("/dashboard/overlay", [OverlaySettingsController::class, 'index'])->name('dashboard.overlay');
    Route::put("/dashboard/overlay", [OverlaySettingsController::class, 'update'])->name('dashboard.overlay.update');
    Route::post("/dashboard/overlay/reset", [OverlaySettingsController::class, 'resetColor'])->name('dashboard.overlay.reset');
    Route::post("/dashboard/overlay/key/reset", [OverlaySettingsController::class, 'resetKey'])->name('dashboard.overlay.key.reset');

    Route::put('/streamQuestion/{question}', [DashboardController::class, 'streamQuestions'])->name('streamQuestion');
    Route::delete('/question/{question}', [DashboardController::class, 'deleteQuestion'])->name('deleteQuestion');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
