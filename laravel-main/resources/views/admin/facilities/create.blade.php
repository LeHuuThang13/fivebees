@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thêm thiết bị | FiveBees')

@section('content')

<form method="POST" action="{{ route('admin.facilities.store') }}" enctype="multipart/form-data" id="storeFacility">
    @csrf
    <div class="info-container d-flex flex-row ">
        <div class="py-2 bg-white table-container" style="margin-right: 20px; border-radius: 10px; width: 70%; max-height: fit-content(20em);">
            <h3 class="mt-2 mx-2">Thêm thiết bị</h3>

            <div class="container">
                <div class="mb-3">
                    <label for="name" class="form-label">Tên thiết bị:</label>
                    <input name="name" type="text" class="form-control" value="{{ old('name') }}" required>
                    @error('name')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <input type="hidden" name="code" value="">

                <div class="mb-3">
                    <label for="description" class="form-label">Mô tả:</label>
                    <textarea name="description" class="form-control" placeholder="Nhập mô tả..." id="floatingTextarea2" style="height: 200px" form="storeFacility"></textarea>
                    @error('description')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <div class="d-flex flex-row">
                    <div class="mb-3">
                        <label for="status_id" class="form-label">Tình trạng:</label>
                        <select id="status" name="status_id" class="form-select" aria-label="Default select example" style="width: 20rem;">
                            @foreach ($status as $id => $status)
                            <option value="{{$id}}" {{ old('status') == $id ? "selected" : "" }}>{{$status}}</option>
                            @endforeach
                        </select>
                        @error('status')
                        <p style="color: #dc3545">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-3 mx-4">
                        <label for="category_id" class="form-label">Loại thiết bị:</label>
                        <select name="category_id" class="form-select" aria-label="Default select example" style="width: 20rem;">
                            @foreach ($categories as $id => $category)
                            <option value="{{$id}}" {{ old('category') == $id ? "selected" : "" }}>{{$category}}</option>
                            @endforeach
                        </select>
                        @error('category')
                        <p style="color: #dc3545">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <input name="created_by_id" type="hidden" value="{{ Auth::user()->id }}">

                <div id="select-room" class="mb-3">
                    <label for="room_id" class="form-label">Phòng:</label>
                    <select name="room_id" class="form-select" aria-label="Default select example" style="width: 20rem;">
                        @foreach ($rooms as $room)
                        <option value="{{$room->id}}" {{ old('room') == $room->id ? "selected" : "" }}>{{$room->room_number}} ({{$room->buildings->name}})</option>
                        @endforeach
                    </select>
                    @error('room_id')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary px-4 pt-2">Thêm</button>
            </div>
        </div>

        <div class="px-2 py-2 bg-white table-container" style="margin-right: 20px; border-radius: 10px; width: 30%">
            <p class="mx-2">Hình ảnh:</p>
            <div class="list-images">
                @if (isset($list_images) && !empty($list_images))
                @foreach (json_decode($list_images) as $key => $img)
                <div class="box-image">
                    <input type="hidden" name="images_uploaded[]" value="{{ $img }}" id="img-{{ $key }}">
                    <img src="{{ asset('images/placeholder.png') }}" class="picture-box">
                    <div class="wrap-btn-delete"><span data-id="img-{{ $key }}" class="btn-delete-image">Bỏ chọn</span></div>
                </div>
                @endforeach
                <input type="hidden" name="images_uploaded_origin" value="{{ $list_images }}">
                <input type="hidden" name="id" value="{{ $id }}">
                @endif
            </div>
            <div class="input-group hdtuto control-group lst increment">
                <div class="list-input-hidden-upload">
                    <input type="file" name="filenames[]" id="file_upload" class="myfrm form-control hidden">
                </div>
            </div>
            @error('filenames.*')
            <p class="mx-2" style="color: #dc3545">{{ $message }}</p>
            @enderror
        </div>

    </div>
</form>

@endsection

@push('scripts')

<script type="text/javascript">
    $(document).ready(function() {
        $(".btn-add-image").click(function() {
            $('#file_upload').trigger('click');
        });

        $('.list-input-hidden-upload').on('change', '#file_upload', function(event) {
            let today = new Date();
            let time = today.getTime();
            let image = event.target.files[0];
            let file_name = event.target.files[0].name;
            let box_image = $('<div class="box-image"></div>');
            let numItems = $('.box-image').length;
            box_image.append('<img src="' + URL.createObjectURL(image) + '" class="picture-box mx-2" style="width: 240px; border-radius: 5px; display: block">');
            box_image.append('<div class="wrap-btn-delete"><button data-id=' + time + ' class="btn btn-link btn-delete-image">Bỏ chọn</button></div>');
            $(".list-images").append(box_image);

            $(this).removeAttr('id');
            $(this).attr('id', time);
            $(this).css('display', 'none')
            let input_type_file = '<input type="file" name="filenames[]" id="file_upload" class="myfrm mt-2 form-control hidden">';
            $('.list-input-hidden-upload').append(input_type_file);
        });

        $(".list-images").on('click', '.btn-delete-image', function() {
            let id = $(this).data('id');
            $('#' + id).remove();
            $(this).parents('.box-image').remove();
        });

        $('#status').change(function() {
            if ($('#status :selected').text() === 'Thanh lý' || $('#status :selected').text() === 'Chưa sử dụng') {
                $('#select-room').val(null);
                $('#select-room').css('display', 'none');
            } else {
                $('#select-room').css('display', 'block');
            }
        });
    });
</script>

@endpush