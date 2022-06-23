<div class="sidebar flex-shrink-0">
    <a href="/" class="d-flex align-items-center text-decoration-none" style=" background-color: #1E9CFF; height: 100px">
        <span class="fs-1 fw-semibold" style="margin: auto; color: #FFFFFF">FIVE BEES</span>
    </a>
    <ul class="ps-0">
        <li class="{{ (request()->is('home')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Trang chủ</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Nhà trọ/ Khách sạn</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Thiết bị</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Loại thiết bị</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Trạng thái</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.users.index')}}">Tài khoản</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Roles</a>
        </li>
        <li class="{{ (request()->is('admin/cities')) ? 'active' : '' }}">
            <a class="main-nav-item" href="">Permissions</a>
        </li>
    </ul>
</div>