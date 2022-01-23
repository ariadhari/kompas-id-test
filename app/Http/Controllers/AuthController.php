<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Author;

class AuthController extends Controller
{
    public function login()
    {
        if (session()->has('auth')) {
            return redirect()->route('home');
        }
        return view('auth.login');
    }

    public function process(LoginRequest $request)
    {

        $request->validated();
        $user = Author::where('username', $request->username)
            // ->where('password', md5($request->password))
            ->where('password', $request->password)
            ->first();

        if ($user) {
            $request->session()->put('auth.id', $user->id);
            $request->session()->put('auth.name', $user->nama);
            $request->session()->put('auth.username', $user->username);
            return redirect()->route('home');
        }

        return redirect()->route('auth.login')->with('errMsg', 'Incorrect Login.');
    }

    public function logout()
    {
        session()->flush();
        return redirect()->route('auth.login');
    }
}
