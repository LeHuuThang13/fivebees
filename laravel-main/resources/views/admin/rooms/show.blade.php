@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Phòng #' . $room->id . ' | FiveBees')

@section('content')

<div class="info-container" style="margin-right: 2rem">
    <div class="container px-0 py-2 bg-white table-container mb-4" style="border-radius: 10px">
        <h3 class="mt-2 mx-2">Tòa nhà {{$room->id}}</h3>
        <hr>

        <div class="d-flex flex-row">
            <div class="p-2" style="width: 55rem;">
                <div class="mb-3">
                    <p>Số phòng: {{$room->room_number}}</p>
                </div>

                <div class="mb-3">
                    <p>Trạng thái: {{$room->status}}</p>
                </div>

                <div class="mb-3">
                    <p>Mô tả:</p>
                    <textarea class="form-control" style="height: 200px" disabled>{{$room->description}}</textarea>
                </div>

                <div class="mb-3">
                    <p>Tòa nhà: {{$room->buildings->name}}</p>
                </div>

                <div class="mb-3">
                    <p>Ngày tạo: {{$room->created_at->format('d/m/Y')}}</p>
                </div>

                <div class="mb-3">
                    <p>Lần cập nhật gần nhất: {{$room->updated_at->format('d/m/Y H:i:s')}}</p>
                </div>
            </div>

            <div class="p-2 flex-shrink-1">
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

    <a class="container px-0 py-2 bg-white table-container mb-4 text-dark" style="text-decoration: none; width: 100%; border-radius: 10px" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <p class="h3 mb-0 mx-2">Danh sách thiết bị</p>
        <div class="collapse" id="collapseExample">
            <hr>
            <div>
                <table class="table table-hover text-center">
                    <thead style="background-color: #F5F9FC;">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">mã thiết bị</th>
                            <th scope="col">tên</th>
                            <th scope="col">trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($room->facilities as $facility)
                        <tr>
                            <td>{{$facility->id}}</td>
                            <td>{{$facility->code}}</td>
                            <td>{{$facility->name}}</td>
                            <td>{{$facility->status->name}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </a>
</div>

@endsection