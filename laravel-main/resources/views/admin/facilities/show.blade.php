@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thiết bị #' . $facility->id . ' | FiveBees')

@section('content')

<div class="info-container" style="margin-right: 2rem">
    <div class="container px-0 py-2 bg-white table-container mb-4" style="border-radius: 10px">
        <h3 class="mt-2 mx-2">Thiết bị {{$facility->id}}</h3>
        <hr>

        <div class="d-flex flex-row">
            <div class="p-2" style="width: 55rem;">
                <div class="mb-3">
                    <p>Tên thiết bị: {{$facility->name}}</p>
                </div>

                <div class="mb-3">
                    <p>Mã thiết bị: {{$facility->code}}</p>
                </div>

                <div class="mb-3">
                    <p>Loại thiết bị: {{$facility->categories->name}}</p>
                </div>

                <div class="mb-3">
                    <p>Trạng thái:
                        @if($facility->status->name == 'Đang sử dụng')
                        <span class="badge rounded-pill text-bg-success">{{$facility->status->name}}</span>
                        @elseif($facility->status->name == 'Chưa sử dụng')
                        <span class="badge rounded-pill text-bg-warning">{{$facility->status->name}}</span>
                        @elseif($facility->status->name == 'Chờ sửa chữa')
                        <span class="badge rounded-pill text-bg-danger">{{$facility->status->name}}</span>
                        @elseif($facility->status->name == 'Thanh lý')
                        <span class="badge rounded-pill text-bg-secondary">{{$facility->status->name}}</span>
                        @endif
                    </p>
                </div>

                <div class="mb-3">
                    <p>Mô tả:</p>
                    <textarea class="form-control" style="height: 200px; " disabled>{{$facility->description}}</textarea>
                </div>

                <div class="mb-3">
                    <p>Ngày tạo: {{$facility->created_at->format('d/m/Y')}}</p>
                </div>

                <div class="mb-3">
                    <p>Lần cập nhật gần nhất: {{$facility->updated_at->format('d/m/Y H:i:s')}}</p>
                </div>

                <div class="mb-3">
                    <p>Vị trí lần cuối: {{$facility->rooms->last()->room_number ?? "Chưa gán"}} {{$facility->rooms->count() > 0 ? $facility->rooms->last()->pivot->updated_at->format('d/m/Y') : ""}}</p>
                </div>
            </div>

            <div class="p-2 flex-shrink-1">
                <p style="margin-bottom: 0;">Hình ảnh:</p>
                @if($photos->count() == 0)
                <p>Thiết bị chưa được cập nhật hình ảnh</p>
                @else
                @foreach($photos as $photo)
                <img src="{{ $photo->getUrl() }}" style="width: 240px; border-radius: 5px; display: inline-block; margin-top: 5px">
                @endforeach
                @endif
            </div>

        </div>
    </div>

    <div class="container px-0 py-2 bg-white table-container mb-4" style="margin-right: 20px; border-radius: 10px">
        <div class="container">
            <p class="mb-0">Mã QR:</p>
        </div>

        <div class="visible-print text-center mb-2">
            {!! QrCode::size(200)->generate($info); !!}
        </div>
    </div>
</div>

@endsection