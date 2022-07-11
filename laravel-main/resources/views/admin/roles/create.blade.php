@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thêm vai trò | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-2">Thêm vai trò</h3>

        <div class="container">
            <form method="POST" action="{{ route('admin.roles.store') }}">
                @csrf
                <div class="mb-3">
                    <label for="name" class="form-label">Tên:</label>
                    <input name="name" type="text" class="form-control" value="{{ old('name') }}">
                    @error('name')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <span>Quyền:</span>
                        <span class="span-check-all px-2 py-1 text-white" style="cursor: pointer; background-color: #1690F8">Chọn hết</span>
                        <span class="span-remove-all px-2 py-1 text-white" style="cursor: pointer; background-color: #1690F8">Bỏ chọn</span>
                        @error('permissions')
                        <p style="color: #dc3545">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="search" class="col-form-label">Tìm kiếm:</label>
                        </div>
                        <div class="col-auto">
                            <input type="text" id="search" class="form-control" placeholder="Nhập tên permissions...">
                        </div>
                    </div>
                </div>

                <div class="mb-3 mt-2 px-2 form-control" style="overflow-y: scroll; height: 200px">
                    @foreach($permissions as $id => $permission)
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="{{$id}}" name="permissions[]" {{ in_array($id, old('permissions[]', [])) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            {{$permission}}
                        </label>
                    </div>
                    @endforeach
                </div>

                <button type="submit" class="btn btn-primary px-4 pt-2">Thêm</button>
            </form>
        </div>
    </div>
</div>

@endsection

@push('scripts')
<script>
    $(document).ready(function() {
        $(document).on('click', '.span-check-all', function() {
            $('input:checkbox').prop('checked', true);
        });

        $(document).on('click', '.span-remove-all', function() {
            $('input:checkbox').prop('checked', false);
        });

        $("#search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".form-check").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    })
</script>
@endpush