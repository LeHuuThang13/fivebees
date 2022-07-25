@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Đổi mật khẩu | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white table-container" style="margin-right: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-2">Đổi mật khẩu</h3>

        <div class="container">
            <form method="POST" action="{{ route('updatepassword') }}">
                @csrf
                <div class="mb-3">
                    <label class="required" for="password">Nhập mật khẩu mới:</label>
                    <input class="form-control {{ $errors->has('password') ? 'is-invalid' : '' }}" type="password" name="password" id="password" required>
                    @error('password')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>
                <div class="mb-3">
                    <label class="required" for="password_confirmation">Nhập lại mật khẩu:</label>
                    <input class="form-control {{ $errors->has('password_confirmation') ? 'is-invalid' : '' }}" type="password" name="password_confirmation" id="password_confirmation" required>
                </div>

                <button type="submit" class="btn btn-primary pt-2">Đổi mật khẩu</button>
            </form>
        </div>
    </div>
</div>

@if(session()->has('message'))
<div class="alert-message">
    <span>{{session()->get('message')}}</span>
</div>
@endif

@endsection

@push('scripts')
<script>
    $(function() {
        setTimeout(function() {
            $(".alert-message").remove()
        }, 3000);
    })
</script>
@endpush