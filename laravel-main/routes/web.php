<?php

use App\Http\Controllers\Admin\BuildingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\StatusController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UtilityController;
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

    Route::delete('categories/destroy', [CategoryController::class, 'massDestroy'])->name('categories.massDestroy');
    Route::resource('categories', CategoryController::class);

    Route::delete('buildings/destroy', [BuildingController::class, 'massDestroy'])->name('buildings.massDestroy');
    Route::post('buildings/photo', [BuildingController::class, 'deleteMedia'])->name('buildings.deleteMedia');
    Route::resource('buildings', BuildingController::class);

    Route::delete('rooms/destroy', [RoomController::class, 'massDestroy'])->name('rooms.massDestroy');
    Route::post('rooms/photo', [RoomController::class, 'deleteMedia'])->name('rooms.deleteMedia');
    Route::resource('rooms', RoomController::class);

    Route::delete('facilities/destroy', [FacilityController::class, 'massDestroy'])->name('facilities.massDestroy');
    Route::post('facilities/photo', [FacilityController::class, 'deleteMedia'])->name('facilities.deleteMedia');
    Route::resource('facilities', FacilityController::class);

    Route::get('utilities/{id}/print', [UtilityController::class, 'print'])->name('utilities.print');
    Route::resource('utilities', UtilityController::class);
});
