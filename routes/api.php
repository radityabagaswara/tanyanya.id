<?php

use App\Http\Controllers\ExploreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/explore', [ExploreController::class, 'getData'])->name('api.explore.get');
