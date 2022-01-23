<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
		$uid = session('auth.id');

		$posts = Article::datatables()
			->select(\DB::raw(
				"COUNT(*) as total_post,
				 COALESCE(SUM(CASE WHEN article.status = '1' THEN 1 END), 0) AS publish"
			))
			->where(
				function($sub) use ($uid) {
					$sub->where('author_id', '=', $uid);
				}
			)
			->whereRaw('YEAR(tanggal_terbit) = ?', [now()->year])
			->whereRaw('MONTH(tanggal_terbit) = ? ', [now()->month])
			->first();

        return view('dashboard', [
			'data' => $posts,
			'countuser' => $posts ?? []
		]);
    }

}
