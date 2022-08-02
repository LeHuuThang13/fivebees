@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Tòa nhà #' . $building->id . ' | FiveBees')

@section('content')


<div class="info-container" style="margin-right: 2rem">
    <div class="container px-0 py-2 bg-white table-container mb-4" style="border-radius: 10px">
        <h3 class="mt-2 mx-2">Tòa nhà {{$building->id}}</h3>
        <hr>

        <div class="d-flex flex-row">
            <div class="container">
                <div class="mb-3">
                    <p>Tên: {{$building->name}}</p>
                </div>

                <div class="mb-3">
                    <p>Địa chỉ: {{$building->address}}</p>
                </div>

                <div class="mb-3">
                    <p>Chủ sở hữu: {{$building->users->name}}</p>
                </div>

                <div class="mb-3">
                    <p>Email: {{$building->email}}</p>
                </div>

                <div class="mb-3">
                    <p>Hotline: {{$building->hotline}}</p>
                </div>

                <div class="mb-3">
                    <p>Ngày đăng ký: {{$building->created_at->format('d/m/Y')}}</p>
                </div>

                <div class="mb-3">
                    <p>Lần cập nhật gần nhất: {{$building->updated_at->format('d/m/Y H:i:s')}}</p>
                </div>
            </div>

            <div class="container">
                <p style="margin-bottom: 0;">Hình ảnh:</p>
                @if($photos->count() == 0)
                <p>Tòa nhà chưa được cập nhật hình ảnh</p>
                @else
                @foreach($photos as $photo)
                <img src="{{ $photo->getUrl() }}" style="width: 240px; border-radius: 5px; display: inline-block; margin-top: 5px">
                @endforeach
                @endif
            </div>

        </div>
    </div>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h6 class="m-0">Danh sách phòng</h6>
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body p-0">
                    <table class="table table-hover text-center">
                        <thead style="background-color: #F5F9FC;">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">số phòng</th>
                                <th scope="col">trạng thái</th>
                                <th scope="col">tổng số thiết bị</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($rooms as $room)
                            <tr>
                                <td>{{$room->id}}</td>
                                <td>{{$room->room_number}}</td>
                                <td>{{$room->status}}</td>
                                <td>{{$room->facilities->count()}}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection