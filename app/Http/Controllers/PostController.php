<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\PostRequest;
use App\Models\Article;
use App\Models\Author;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class PostController extends Controller
{
    public function __construct()
    {
    }

    public function index()
    {
        $authors = Helper::getSelectOptionUsers(Author::all());
        return view('posts.index', [
            'users' => $authors
        ]);
    }

    public function datatables(Request $request)
    {
        if ($request->ajax()) {
            $count = count(Article::all());

            return DataTables::queryBuilder(Article::datatables())
                ->addIndexColumn()
                ->addColumn('action', function ($row) {
                    $btn = '
                    <span style="overflow: visible; position: relative; width: 125px;">
                        <div class="dropdown dropdown-inline">
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">
                                <span class="svg-icon svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                <ul class="navi flex-column navi-hover py-2">
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">
                                        Choose an action:
                                    </li>
                                    <li class="navi-item">
                                        <a href="' . route('posts.show', $row->id) . '" target="_blank" title="View" class="navi-link">
                                            <span class="navi-icon"><i class="far fa-eye text-warning mr-5"></i></span>
                                            <span class="navi-text">View</span>
                                        </a>
                                    </li>
                                    <li class="navi-item">
                                        <a href="' . route('posts.edit', $row->id) . '" title="Edit" class="navi-link">
                                            <span class="navi-icon"><i class="far fa-edit text-success mr-5"></i></span>
                                            <span class="navi-text">Edit</span>
                                        </a>
                                    </li>
                                    <li class="navi-item">
                                        <a href="' . route('posts.publish', $row->id) . '" title="Publish" class="navi-link">
                                            <span class="navi-icon"><i class="far fa-paper-plane text-info mr-5"></i></span>
                                            <span class="navi-text">Publish</span>
                                        </a>
                                    </li>
                                    <li class="navi-item">
                                        <a href="javascript:void(0)" onclick="destroy(' . $row->id . ')" title="Delete" class="navi-link">
                                            <span class="navi-icon"><i class="far fa-trash-alt text-danger mr-5"></i></span>
                                            <span class="navi-text">Delete</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </span>';
                    return $btn;
                })
                ->rawColumns(['action'])
                ->setFilteredRecords($count)
                ->setTotalRecords($count)
                ->skipTotalRecords()
                ->make(true);
        }
    }

    public function create()
    {
        $authors = Helper::getSelectOptionUsers(Author::all());
        return view('posts.create', ['users' => $authors, 'state' => 'add']);
    }

    public function store(PostRequest $request)
    {
        $validated = $request->validated();

        $post = new Article($validated);
        $post->body = e($validated['body']);
        $post->status = '0';

        if($post->save()) {
            return redirect()->route('posts.index')->with(['scsMsg' => 'Data is successfully saved.']);
        } else {
            return redirect()->route('posts.index')->with(['errMsg', 'Failed to save data.']);
        }
    }

    public function show(Article $post)
    {
        $authors = Helper::getSelectOptionUsers(Author::all());
        return view('posts.show', [
            'state' => 'edit', 'post' => $post, 'users' => $authors
        ]);
    }

    public function edit(Article $post)
    {
        $authors = Helper::getSelectOptionUsers(Author::all());
        return view('posts.edit', [
            'state' => 'edit', 'post' => $post, 'users' => $authors
        ]);
    }

    public function update(PostRequest $request, Article $post)
    {
        $validated = $request->validated();

        if($post->update($validated)) {
            return redirect()->route('posts.index')->with(['scsMsg' => 'Data has been changed successfully.']);
        } else {
            return redirect()->route('posts.index')->with(['errMsg', 'Failed to save data.']);
        }
    }

    public function publish($post)
    {
        $update = Article::find($post);
        $data['status'] = '1';
        $update->update($data);
        return redirect()->route('posts.index')->with(['scsMsg' => 'Data has been published successfully.']);
    }

    public function destroy(Article $post)
    {
        $response = false;
        if($post->delete()) {
            $response = true;
        }
        return response()->json($response);
    }

}
