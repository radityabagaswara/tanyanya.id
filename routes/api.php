<?php

use App\Http\Controllers\ExploreController;
use App\Http\Controllers\PaymentCallbackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Hello world',
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/explore', [ExploreController::class, 'getData'])->name('api.explore.get');

Route::post('paymentNotification', [PaymentCallbackController::class, 'handleNotification']);
