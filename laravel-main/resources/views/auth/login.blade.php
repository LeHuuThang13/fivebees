@extends('components.layout')

@section('title') {{ 'Login' }} @endsection

@section('content')
<div class="container">
    <div class="split left">
        <div class="login-logo">
            <h1 style="font-size: 500%; color: #1E9CFF">Five Bees</h1>
        </div>
    </div>

    <div class="split right">
        <div class="centered">
            <h1>Đăng nhập tài khoản <span style="color: #1E9CFF">Five Bees</span></h1>
            <div class="login-form mt-5 mb-2 container" style="width: 70%;">
                <form id="form" method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="mb-4" style="text-align: left;">
                        <input name="email" type="email" class="login-input form-control p-4" placeholder="Email" style="border-radius: 40px; font-size: 150%" value="{{ old('email') }}">
                        @error('email')
                        <p class="text-danger ms-4 mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-4" style="text-align: left;">
                        <input name="password" type="password" class="login-input form-control p-4" placeholder="Password" style="border-radius: 40px; font-size: 150%">
                        @error('password')
                        <p class="text-danger ms-4 mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                    <button type="submit" class="login-btn btn btn-primary mt-2">Đăng nhập</button>
                </form>
            </div>
            <a class="register" href="{{ route('register.index') }}" style="font-size: 150%;">Hoặc đăng ký</a>
        </div>
    </div>
</div>

@endsection