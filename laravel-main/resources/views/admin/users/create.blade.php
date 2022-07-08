@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thêm tài khoản | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-2">Thêm tài khoản</h3>

        <div class="container">
            <form method="POST" action="{{ route('admin.users.store') }}">
                @csrf
                <div class="mb-3">
                    <label for="name" class="form-label">Tên tài khoản:</label>
                    <input name="name" type="text" class="form-control" value="{{ old('name') }}">
                    @error('name')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input name="email" type="text" class="form-control" value="{{ old('email') }}">
                    @error('email')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu:</label>
                    <input name="password" type="text" class="form-control" value="{{ old('password') }}">
                    @error('password')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <span>Vai trò:</span>
                <span class="span-check-all px-2 py-1 text-white" style="cursor: pointer; background-color: #1690F8">Chọn hết</span>
                <span class="span-remove-all px-2 py-1 text-white" style="cursor: pointer; background-color: #1690F8">Bỏ chọn</span>
                <div class="mb-3 mt-2 px-2">
                    @foreach($roles as $id => $role)
                    <div class="form-check">
                        <input class="form-check-input checks" type="checkbox" value="{{$id}}" name="roles[]" {{ in_array($id, old('roles[]', [])) ? 'checked' : '' }}>
                        <label class="form-check-label" for="flexCheckChecked">
                            {{$role}}
                        </label>
                    </div>
                    @endforeach

                    @error('roles')
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