<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function login()
    {
        $attributes = request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ], [
            // Hiển thị thông báo khi nhập không đạt yêu cầu
            'email.required' => 'Vui lòng nhập Email',
            'password.required' => 'Vui lòng nhập password'
        ]);

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
