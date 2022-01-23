<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

class AuthCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (session()->has('auth.access')) {

            $permissions = [
                'UserController/index' => 'user/index',
                'UserController/datatables' => 'user/index',
                'UserController/show' => 'user/index',
                'UserController/create' => 'user/add',
                'UserController/store' => 'user/add',
                'UserController/edit' => 'user/edit',
                'UserController/update' => 'user/edit',
                'UserController/destroy' => 'user/delete',

                'ImageController/index' => 'image/index',
                'ImageController/datatables' => 'image/index',
                'ImageController/show' => 'image/index',
                'ImageController/create' => 'image/add',
                'ImageController/store' => 'image/add',
                'ImageController/edit' => 'image/edit',
                'ImageController/update' => 'image/edit',
                'ImageController/destroy' => 'image/delete',

                'InfographicController/index' => 'infografik/index',
                'InfographicController/datatables' => 'infografik/index',
                'InfographicController/show' => 'infografik/index',
                'InfographicController/create' => 'infografik/add',
                'InfographicController/store' => 'infografik/add',
                'InfographicController/edit' => 'infografik/edit',
                'InfographicController/update' => 'infografik/edit',
                'InfographicController/destroy' => 'infografik/delete',

                'LockController/index' => 'lock/index',
                'LockController/datatables' => 'lock/index',
                'LockController/show' => 'lock/index',
                'LockController/create' => 'lock/add',
                'LockController/store' => 'lock/add',
                'LockController/edit' => 'lock/edit',
                'LockController/update' => 'lock/edit',
                'LockController/destroy' => 'lock/delete',

                'PostController/index' => 'article/index',
                'PostController/datatables' => 'article/index',
                'PostController/show' => 'article/index',
                'PostController/create' => 'article/add',
                'PostController/store' => 'article/add',
                'PostController/edit' => 'article/edit',
                'PostController/update' => 'article/edit',
                'PostController/publish' => 'article/edit',
                'PostController/destroy' => 'article/delete',

                'StoryController/index' => 'story/index',
                'StoryController/datatables' => 'story/index',
                'StoryController/show' => 'story/index',
                'StoryController/create' => 'story/add',
                'StoryController/store' => 'story/add',
                'StoryController/edit' => 'story/edit',
                'StoryController/update' => 'story/edit',
                'StoryController/publish' => 'story/edit',
                'StoryController/destroy' => 'story/delete',
                'StorySectionController/destroy' => 'story/delete',

                'PlusController/index' => 'plus/index',
                'PlusController/datatables' => 'plus/index',
                'PlusController/show' => 'plus/index',
                'PlusController/create' => 'plus/add',
                'PlusController/store' => 'plus/add',
                'PlusController/edit' => 'plus/edit',
                'PlusController/update' => 'plus/edit',
                'PlusController/publish' => 'plus/edit',
                'PlusController/destroy' => 'plus/delete',
                'PlusSectionController/destroy' => 'plus/delete',

                'TagController/index' => 'tag/index',
                'TagController/iframe' => 'tag/index',
                'TagController/icreate' => 'tag/add',
                'TagController/istore' => 'tag/add',
                'TagController/datatables' => 'tag/index',
                'TagController/show' => 'tag/index',
                'TagController/create' => 'tag/add',
                'TagController/store' => 'tag/add',
                'TagController/edit' => 'tag/edit',
                'TagController/update' => 'tag/edit',
                'TagController/destroy' => 'tag/delete',

                'HotTopicController/index' => 'hot_topic/index',
                'HotTopicController/datatables' => 'hot_topic/index',
                'HotTopicController/show' => 'hot_topic/index',
                'HotTopicController/create' => 'hot_topic/add',
                'HotTopicController/store' => 'hot_topic/add',
                'HotTopicController/edit' => 'hot_topic/edit',
                'HotTopicController/update' => 'hot_topic/edit',
                'HotTopicController/destroy' => 'hot_topic/delete',

                'CategoryController/index' => 'category/index',
                'CategoryController/datatables' => 'category/index',
                'CategoryController/show' => 'category/index',
                'CategoryController/create' => 'category/add',
                'CategoryController/store' => 'category/add',
                'CategoryController/edit' => 'category/edit',
                'CategoryController/update' => 'category/edit',
                'CategoryController/destroy' => 'category/delete',
            ];

            $activeController = class_basename(Route::current()->controller) . '/' . Route::current()->getActionMethod();
            if (!array_key_exists($activeController, $permissions)) {
                abort(403);
            }
            $permission = $permissions[$activeController];
            $access = Arr::pluck(session()->get('auth.access'), 'access');

            if (array_search($permission, $access) === false) {
                abort(403);
            }
        } else {
            abort(403);
        }

        return $next($request);
    }
}
