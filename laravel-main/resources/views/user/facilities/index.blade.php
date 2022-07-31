@extends('components.layout')

@section('content')
<div class="container">
    <p>Tên thiết bị: {{$facility->name}}</p>
    <p>Mã thiết bị: {{$facility->code}}</p>
    <p>Loại thiết bị: {{$facility->categories->name}}</p>
    <p>Trạng thái: {{$facility->status->name}}</p>
    <p>Mô tả: {{$facility->description}}</p>
    <p>Phòng: {{$facility->rooms->last()->room_number ?? 'Chưa gán'}}</p>
    @foreach($photos as $photo)
    <img src="{{ $photo->getUrl() }}" style="width: 240px; border-radius: 5px; display: inline-block; margin-top: 5px">
    @endforeach
</div>

@endsection