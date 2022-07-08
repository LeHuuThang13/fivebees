@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Tòa nhà #' . $building->id . ' | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-2">Tòa nhà {{$building->id}}</h3>
        <hr>

        <div class="d-flex flex-row">
            <div class="container">
                <div class="mb-3">
                    <p>Tên: {{$building->name}}</p>
                </div>

                <div class="mb-3">
                    <p>địa chỉ: {{$building->address}}</p>
                </div>

                <div class="mb-3">
                    <p>Chủ sở hữu: {{$building->users->name}}</p>
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
</div>

@endsection