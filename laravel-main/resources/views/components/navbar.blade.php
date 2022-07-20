<nav class="navbar navbar-light bg-white" style="padding: 0;">
    <div class="container-fluid">
        <span class="navbar-brand mb-0 h1"></span>
        <ul class="nav justify-content-end">

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle fs-5" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #000000;">
                    <img src="{{ asset('images/avatar/admin.png') }}" alt="#" style="border-radius: 50%; max-height: 100%; max-width: 100%; margin-right: 5px; margin-bottom: 2px">
                    {{ auth()->user()->name }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="left: auto; right: 0">
                    <li><a class="dropdown-item" href="">Đổi mật khẩu</a></li>
                    <li>
                        <form method="POST" action="{{ route('logout') }}" style="margin: 0;">
                            @csrf
                            <button class="dropdown-item">Đăng xuất</button>
                        </form>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>