<?php

use App\Http\Controllers\PlusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotTopicController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InfographicController;
use App\Http\Controllers\LockController;
use App\Http\Controllers\PlusSectionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;


Route::group(['middleware' => 'auth.user'], function () {
	Route::post('pluses/title', [PlusController::class, 'checkTitle']);
	Route::post('pluses/addSection', [PlusController::class, 'addSection']);
	Route::resource('plus-sections', PlusSectionController::class)->only('destroy');

	Route::post('posts/title', [PostController::class, 'checkTitle']);
	Route::get('posts/iframe', [PostController::class, 'iframe'])->name('posts.iframe');
	Route::post('posts/addSection', [PostController::class, 'addSection']);
	Route::delete('posts/removeSection/{id}', [PostController::class, 'removeSection']);

	Route::get('lock/article', [LockController::class, 'article'])->name('articleLock');
	Route::post('lock/generate-url-category', [LockController::class, 'generateUrlCategory']);
	Route::post('lock/check-channel', [LockController::class, 'is_ExistChannel']);

	Route::post('hot_topic/set-status', [HotTopicController::class, 'setStatus']);
	Route::post('hot_topic/publish', [HotTopicController::class, 'publish']);

	Route::get('tag/iframe', [TagController::class, 'iframe'])->name('tag.iframe');
	Route::post('tag/title', [TagController::class, 'checkTitle']);
	Route::post('tag/store-meta', [TagController::class, 'storeMeta']);
	Route::post('tag/set-hot-topic', [TagController::class, 'setHotTopic']);

	Route::get('images/iframe', [ImageController::class, 'iframe'])->name('images.iframe');
	Route::get('infographics/iframe', [InfographicController::class, 'iframe'])->name('infographics.iframe');

	Route::post('user/validate', [UserController::class, 'checkUnique']);

});
