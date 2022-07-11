@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Phòng #' . $room->id . ' | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; border-radius: 10px">
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
</div>

@endsection