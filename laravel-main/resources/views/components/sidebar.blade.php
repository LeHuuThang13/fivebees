<div class="sidebar flex-shrink-0">
    <a href="/" class="d-flex align-items-center text-decoration-none" style=" background-color: #1E9CFF; height: 100px">
        <span class="fs-1 fw-semibold" style="margin: auto; color: #FFFFFF">FIVE BEES</span>
    </a>
    <ul class="ps-0">
        <li class="{{ Request::segment(1) === 'home' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('home')}}">Trang chủ</a>
        </li>
        <li class="{{ Request::segment(2) === 'buildings' ? 'active' : '' }}">
            <a class="main-nav-item" href="">Nhà trọ/ Khách sạn</a>
        </li>
        <li class="{{ Request::segment(2) === 'items' ? 'active' : '' }}">
            <a class="main-nav-item" href="">Thiết bị</a>
        </li>
        <li class="{{ Request::segment(2) === 'category' ? 'active' : '' }}">
            <a class="main-nav-item" href="">Loại thiết bị</a>
        </li>
        <li class="{{ Request::segment(2) === 'status' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.status.index')}}">Trạng thái</a>
        </li>
        <li class="{{ Request::segment(2) === 'users' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.users.index')}}">Tài khoản</a>
        </li>
        <li class="{{ Request::segment(2) === 'roles' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.roles.index')}}">Roles</a>
        </li>
        <li class="{{ Request::segment(2) === 'permissions' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.permissions.index')}}">Permissions</a>
        </li>
    </ul>
</div>