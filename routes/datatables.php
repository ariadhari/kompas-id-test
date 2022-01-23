<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth.user'], function () {
    Route::post('posts', [PostController::class, 'datatables']);
});
