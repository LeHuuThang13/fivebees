@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thêm quyền | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white table-container" style="margin-right: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-2">Thêm quyền</h3>

        <div class="container">
            <form method="POST" action="{{ route('admin.permissions.store') }}">
                @csrf
                <div class="mb-3">
                    <label for="name" class="form-label">Tên:</label>
                    <input name="name" type="text" class="form-control" value="{{ old('name') }}">
                    @error('name')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <span>Hành động:</span>
                <span class="span-check-all px-2 py-1 text-white" style="cursor: pointer; background-color: #1690F8">Chọn hết</span>
                <span class="span-remove-all px-2 py-1 text-white" style="cursor: pointer; background-color: #1690F8">Bỏ chọn</span>
                <div class="mb-3 mt-2 px-2">
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="_show" name="actions[]" {{ old('actions[]', []) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            View
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="_access" name="actions[]" {{ old('actions[]', []) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            Access
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="_create" name="actions[]" {{ old('actions[]', []) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            Create
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="_edit" name="actions[]" {{ old('actions[]', []) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            Edit
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="_delete" name="actions[]" {{ old('actions[]', []) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            Delete
                        </label>
                    </div>
                    @error('actions')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
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
    })
</script>
@endpush