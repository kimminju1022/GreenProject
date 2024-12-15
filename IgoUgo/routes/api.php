<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
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

// 테스트용 라우터
Route::get('/test-data', [TestController::class, 'index']);

// 호텔리스트 라우터
Route::get('/hotels', [ApiController::class, 'hotelProducts']);

// 로그인
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

// 회원가입
Route::post('/registration', [UserController::class, 'store'])->name('user.store');

// 인증필요 라우트 그룹
Route::middleware('my.auth')->group(function() {
    // 로그아웃
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    // 토큰 재발급
    Route::post('/reissue', [AuthController::class, 'reissue'])->name('auth.reissue');
    
});