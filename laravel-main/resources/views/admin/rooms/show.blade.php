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

    <div class="accordion mb-4 table-container" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h6 class="m-0">Danh sách thiết bị</h6>
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body p-0">
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
                                <td>
                                    @php $background = "" @endphp
                                    @if($facility->status->id == 1)
                                    @php $background = "text-bg-success" @endphp
                                    @elseif($facility->status->id == 2)
                                    @php $background = "text-bg-warning" @endphp
                                    @elseif($facility->status->id == 3)
                                    @php $background = "text-bg-danger" @endphp
                                    @else
                                    @php $background = "text-bg-secondary" @endphp
                                    @endif
                                    <span class="badge rounded-pill {{$background}}">{{$facility->status->name}}</span>
                                </td>
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