<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function login(LoginRequest $request)
    {
        $attributes = $request->validated();

        if (!auth()->attempt($attributes)) {
            return back()->withErrors([
                'email' => 'Email đăng nhập không đúng',
                'password' => 'Sai mật khẩu'
            ]);
        }

        session()->regenerate();
        return redirect('home')->with('success', 'Đăng nhập thành công!');
    }

    public function logout()
    {
        auth()->logout();

        return redirect('login');
    }
}
