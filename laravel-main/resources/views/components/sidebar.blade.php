<div class="sidebar flex-shrink-0">
    <a href="/" class="d-flex align-items-center text-decoration-none" style=" background-color: #1E9CFF; height: 100px">
        <span class="fs-1 fw-semibold" style="margin: auto; color: #FFFFFF">FIVE BEES</span>
    </a>
    <ul class="ps-0">
        <li class="{{ Request::segment(1) === 'home' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('home')}}">
                Trang chủ
                <span class="material-symbols-outlined">
                    dashboard
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'buildings' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.buildings.index')}}">
                Nhà trọ / Khách sạn
                <span class="material-symbols-outlined">
                    apartment
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'rooms' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.rooms.index')}}">
                Phòng
                <span class="material-symbols-outlined">
                    meeting_room
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'facilities' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.facilities.index')}}">
                Thiết bị
                <span class="material-symbols-outlined">
                    king_bed
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'categories' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.categories.index')}}">
                Loại thiết bị
                <span class="material-symbols-outlined">
                    category
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'status' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.status.index')}}">
                Trạng thái
                <span class="material-symbols-outlined">
                    today
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'users' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.users.index')}}">
                Tài khoản
                <span class="material-symbols-outlined">
                    manage_accounts
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'roles' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.roles.index')}}">
                Vai trò
                <span class="material-symbols-outlined">
                    how_to_reg
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'permissions' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.permissions.index')}}">
                Phân quyền
                <span class="material-symbols-outlined">
                    verified
                </span>
            </a>
        </li>
    </ul>
</div>