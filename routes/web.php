<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JoinMemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferalController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', HomeController::class);

Route::middleware('auth')->name('dashboard.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/ticket', [DashboardController::class, 'ticket'])->name('ticket');

    // referal
    Route::name('referal.')->group(function () {
        Route::get('/referal', ReferalController::class)->name('index');
        Route::post('/referal/store', [ReferalController::class, 'store'])->name('store');
        // Route::put('/event/update/{id}', [ReferalController::class, 'update'])->name('update');
        // Route::delete('/event/delete/{id}', [ReferalController::class, 'delete'])->name('delete');
    });

    // event
    Route::name('event.')->group(function () {
        Route::get('/event', EventController::class)->name('index');
        Route::post('/event/store', [EventController::class, 'store'])->name('store');
        Route::put('/event/update/{id}', [EventController::class, 'update'])->name('update');
        Route::delete('/event/delete/{id}', [EventController::class, 'delete'])->name('delete');
    });
});
// profile
Route::name('profile.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
});

Route::get('/join-member', [JoinMemberController::class, 'index'])->name('join-member');
Route::post('/join-member', [JoinMemberController::class, 'store'])->name('join-member');

require __DIR__ . '/auth.php';
