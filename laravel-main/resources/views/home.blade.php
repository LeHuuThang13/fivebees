@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Trang chủ | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="info-block bg-white d-flex flex-column" style="border-radius: 10px; position: relative">
        <p style="color: #6B7B93">Nhà trọ / khách sạn</p>
        <span class="badge rounded-pill text-bg-primary" style="width: 50px; height: 50px; position: absolute; right: 20px">
            <span class="material-symbols-outlined" style="margin-top: 8px">
                apartment
            </span>
        </span>
        <div class="mt-3">
            <p class="h3" style="margin-bottom: 0;">{{$buildings->count()}} tòa</p>
            <hr style="margin: 10px auto">
            <a href="{{route('admin.buildings.index')}}" style="text-decoration: none;">Xem chi tiết</a>
        </div>
    </div>

    <div class="info-block bg-white d-flex flex-column" style="border-radius: 10px; position: relative">
        <p style="color: #6B7B93">Tổng số phòng</p>
        <span class="badge rounded-pill" style="width: 50px; height: 50px; position: absolute; right: 20px; background-color: #d63384">
            <span class="material-symbols-outlined" style="margin-top: 8px">
                meeting_room
            </span>
        </span>
        <div class="mt-3">
            <p class="h3" style="margin-bottom: 0;">{{$rooms->count()}} phòng</p>
            <hr style="margin: 10px auto">
            <a href="{{route('admin.rooms.index')}}" style="text-decoration: none;">Xem chi tiết</a>
        </div>
    </div>

    <div class="info-block bg-white d-flex flex-column" style="border-radius: 10px; position: relative">
        <p style="color: #6B7B93">Tổng thiết bị</p>
        <span class="badge rounded-pill" style="width: 50px; height: 50px; position: absolute; right: 20px; background-color: #6610f2">
            <span class="material-symbols-outlined" style="margin-top: 8px">
                king_bed
            </span>
        </span>
        <div class="mt-3">
            <p class="h3" style="margin-bottom: 0;">{{$facilities->count()}} thiết bị</p>
            <hr style="margin: 10px auto">
            <a href="{{route('admin.facilities.index')}}" style="text-decoration: none;">Xem chi tiết</a>
        </div>
    </div>

    <div class="info-block bg-white d-flex flex-column" style="border-radius: 10px; position: relative">
        <p style="color: #6B7B93">Thiết bị cần sửa chữa</p>
        <span class="badge rounded-pill" style="width: 50px; height: 50px; position: absolute; right: 20px; background-color: #fd7e14">
            <span class="material-symbols-outlined" style="margin-top: 8px">
                build
            </span>
        </span>
        <div class="mt-3">
            <p class="h3" style="margin-bottom: 0;">{{$facilities->where('status_id', 3)->count()}} thiết bị</p>
            <hr style="margin: 10px auto">
            <a href="{{route('admin.facilities.index')}}" style="text-decoration: none;">Xem chi tiết</a>
        </div>
    </div>
</div>

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; margin-bottom: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-3">Danh sách thiết bị ở các phòng</h3>

        <table id="facilities-table" class="table align-middle">
            <thead style="background-color: #F5F9FC;">
                <tr>
                    <th>id</th>
                    <th>mã thiết bị</th>
                    <th>tên</th>
                    <th>phòng</th>
                    <th>trạng thái</th>
                </tr>
            </thead>
        </table>
    </div>
</div>

@endsection

@push('scripts')
<script>
    $(function() {
        let table = $('#facilities-table').DataTable({
            processing: true,
            serverSide: true,
            retrieve: true,
            aaSorting: [],
            ajax: "{{route('home')}}",
            columns: [{
                    data: 'id',
                    name: 'id'
                },
                {
                    data: 'code',
                    name: 'code',
                    className: 'text-truncate'
                },
                {
                    data: 'name',
                    name: 'name'
                },
                {
                    data: 'room',
                    name: 'room'
                },
                {
                    data: 'status',
                    name: 'status'
                },
            ],
            "columnDefs": [{
                "targets": [0],
                "orderable": false,
            }, ],
        });
    })
</script>
@endpush