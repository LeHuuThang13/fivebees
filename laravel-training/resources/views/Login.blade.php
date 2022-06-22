<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<form id="form" method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="mb-4" style="text-align: left;">
                        <input name="email" type="email" class="login-input form-control p-4" placeholder="Email" style="border-radius: 40px; font-size: 150%">
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
                    <button type="submit" class="btn btn-primary mt-2 login-input" style="background-color: #1E9CFF;width: 100%; border-radius: 40px; font-size: 150%">Đăng nhập</button>
                </form>   
</body>
</html>