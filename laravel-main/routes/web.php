<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\StatusController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\HomeController;
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

Route::redirect('/', 'login');

Route::get('home', [HomeController::class, 'index'])->middleware('auth')->name('home');

Route::group(['controller' => LoginController::class], function () {
    Route::get('login', 'index')->middleware('guest');
    Route::post('login', 'login')->name('login');
    Route::post('logout', 'logout')->middleware('auth')->name('logout');
});

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth']], function () {
    Route::delete('users/destroy', [UserController::class, 'massDestroy'])->name('users.massDestroy');
    Route::resource('users', UserController::class);

    Route::delete('roles/destroy', [RoleController::class, 'massDestroy'])->name('roles.massDestroy');
    Route::resource('roles', RoleController::class);

    Route::delete('permissions/destroy', [PermissionController::class, 'massDestroy'])->name('permissions.massDestroy');
    Route::resource('permissions', PermissionController::class);

    Route::delete('status/destroy', [StatusController::class, 'massDestroy'])->name('status.massDestroy');
    Route::resource('status', StatusController::class);
});
