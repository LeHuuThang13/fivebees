@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thêm phòng | FiveBees')

@section('content')

<form method="POST" action="{{ route('admin.rooms.store') }}" enctype="multipart/form-data" id="storeRoom">
    @csrf
    <div class="info-container d-flex flex-row ">
        <div class="py-2 bg-white" style="margin-right: 20px; border-radius: 10px; width: 70%; max-height: 650px;">
            <h3 class="mt-2 mx-2">Thêm phòng</h3>

            <div class="container">
                <div class="mb-3">
                    <label for="room_number" class="form-label">Số phòng:</label>
                    <input name="room_number" type="text" class="form-control" value="{{ old('room_number') }}" required>
                    @error('room_number')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="status" class="form-label">Trạng thái:</label>
                    <input name="status" type="text" class="form-control" value="{{ old('status') }}" required>
                    @error('status')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <input name="created_by_id" type="hidden" value="{{ Auth::user()->id }}">

                <div class="mb-3">
                    <label for="description" class="form-label">Mô tả:</label>
                    <textarea name="description" class="form-control" placeholder="Nhập mô tả..." id="floatingTextarea2" style="height: 200px" form="storeRoom"></textarea>
                    @error('description')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="building_id" class="form-label">Tòa nhà:</label>
                    <select name="building_id" class="form-select" aria-label="Default select example" style="width: 20rem;">
                        @foreach ($buildings as $id => $building)
                        <option value="{{$id}}" {{ old('building') == $id ? "selected" : "" }}>{{$building}}</option>
                        @endforeach
                    </select>
                    @error('building')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>
                <button type="submit" class="btn btn-primary px-4 pt-2">Thêm</button>
            </div>
        </div>

        <div class="px-2 py-2 bg-white" style="margin-right: 20px; border-radius: 10px; width: 30%">
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
            @error('filenames')
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
    });
</script>

@endpush