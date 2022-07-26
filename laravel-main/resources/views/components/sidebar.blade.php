<div class="sidebar flex-shrink-0">
    <a href="/" class="d-flex align-items-center text-decoration-none" style=" background-color: #1E9CFF; height: 100px">
        <span class="fs-1 fw-semibold" style="margin: auto; color: #FFFFFF">FIVE BEES</span>
    </a>
    <ul class="ps-0">
        <li class="{{ Request::segment(1) === 'home' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('home')}}">
                <span class="material-symbols-outlined">
                    dashboard
                </span>
                <span class="mx-2">
                    Trang chủ
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'buildings' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.buildings.index')}}">
                <span class="material-symbols-outlined">
                    apartment
                </span>
                <span class="mx-2">
                    Nhà trọ
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'rooms' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.rooms.index')}}">
                <span class="material-symbols-outlined">
                    meeting_room
                </span>
                <span class="mx-2">
                    Phòng
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'facilities' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.facilities.index')}}">
                <span class="material-symbols-outlined">
                    king_bed
                </span>
                <span class="mx-2">
                    Thiết bị
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'categories' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.categories.index')}}">
                <span class="material-symbols-outlined">
                    category
                </span>
                <span class="mx-2">
                    Loại thiết bị
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'status' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.status.index')}}">
                <span class="material-symbols-outlined">
                    today
                </span>
                <span class="mx-2">
                    Trạng thái
                </span>
            </a>
        </li>
        @role('Admin')
        <li class="{{ Request::segment(2) === 'users' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.users.index')}}">
                <span class="material-symbols-outlined">
                    manage_accounts
                </span>
                <span class="mx-2">
                    Tài khoản
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'roles' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.roles.index')}}">
                <span class="material-symbols-outlined">
                    how_to_reg
                </span>
                <span class="mx-2">
                    Vai trò
                </span>
            </a>
        </li>
        <li class="{{ Request::segment(2) === 'permissions' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.permissions.index')}}">
                <span class="material-symbols-outlined">
                    verified
                </span>
                <span class="mx-2">
                    Phân quyền
                </span>
            </a>
        </li>

        @endrole
        <li class="{{ Request::segment(2) === 'utilities' ? 'active' : '' }}">
            <a class="main-nav-item" href="{{route('admin.utilities.index')}}">
                <span class="material-symbols-outlined">
                    settings
                </span>
                <span class="mx-2">
                    Tiện ích
                </span>
            </a>
        </li>
    </ul>
</div>