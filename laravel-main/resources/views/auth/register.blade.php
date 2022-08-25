@extends('components.layout')

@section('title') {{ 'Đăng ký' }} @endsection

@section('content')
<div class="container">
    <div class="split left">
        <div class="login-logo">
            <h1 style="font-size: 500%; color: #1E9CFF">Five Bees</h1>
        </div>
    </div>

    <div class="split right">
        <div class="centered">
            <h1>Đăng ký tài khoản <span style="color: #1E9CFF">Five Bees</span></h1>
            <div class="login-form mt-5 mb-2 container" style="width: 70%;">
                <form id="form" method="POST" action="{{ route('register.post') }}">
                    @csrf
                    <div class="mb-4" style="text-align: left;">
                        <input name="name" type="text" class="login-input form-control p-4" placeholder="Họ tên" style="border-radius: 40px; font-size: 150%" value="{{ old('email') }}">
                        @error('name')
                        <p class="text-danger ms-4 mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-4" style="text-align: left;">
                        <input name="email" type="email" class="login-input form-control p-4" placeholder="Email" style="border-radius: 40px; font-size: 150%">
                        @error('email')
                        <p class="text-danger ms-4 mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-4" style="text-align: left;">
                        <input name="password" type="password" class="login-input form-control p-4" placeholder="Mật khẩu" style="border-radius: 40px; font-size: 150%">
                        @error('password')
                        <p class="text-danger ms-4 mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-4" style="text-align: left;">
                        <input name="password_confirmation" type="password" class="login-input form-control p-4" placeholder="Xác thực mật khẩu" style="border-radius: 40px; font-size: 150%">
                        @error('password')
                        <p class="text-danger ms-4 mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                    <button type="submit" class="login-btn btn btn-primary mt-2">Đăng ký</button>
                </form>
            </div>
            <span style="font-size: 150%">Đã có tài khoản?<a class="register" href="{{ route('login') }}"> Đăng nhập</a></span>
        </div>
    </div>
</div>

@endsection