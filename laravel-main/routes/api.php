<?php

use App\Http\Controllers\Api\V1\Admin\BuildingApiController;
use App\Http\Controllers\Api\V1\Admin\CategoryApiController;
use App\Http\Controllers\Api\V1\Admin\FacilityApiController;
use App\Http\Controllers\Api\V1\Admin\RoomApiController;
use App\Http\Controllers\Api\V1\Admin\StatusApiController;
use App\Http\Controllers\Api\V1\Admin\UserApiController;
use App\Http\Controllers\Api\V1\AuthenticationApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1', 'as' => 'api.', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/facilities/getListDamagedFacility', [FacilityApiController::class, 'getListDamagedFacility']);
    Route::apiResource('facilities', FacilityApiController::class);

    Route::apiResource('rooms', RoomApiController::class);
    Route::apiResource('users', UserApiController::class);
    Route::apiResource('buildings', BuildingApiController::class);
    Route::apiResource('categories', CategoryApiController::class);
    Route::apiResource('status', StatusApiController::class);
});

Route::group(['prefix' => 'v1', 'as' => 'api.'], function () {
    Route::post('login', [AuthenticationApiController::class, 'login']);
    Route::post('logout', [AuthenticationApiController::class, 'logout'])->middleware('auth:sanctum');
});
