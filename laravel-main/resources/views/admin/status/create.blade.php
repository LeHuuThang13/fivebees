@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thêm tình trạng thiết bị | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-2">Thêm tình trạng</h3>

        <div class="container">
            <form method="POST" action="{{ route('admin.status.store') }}">
                @csrf
                <div class="mb-3">
                    <label for="name" class="form-label">Tên tình trạng:</label>
                    <input name="name" type="text" class="form-control" value="{{ old('name') }}">
                    @error('name')
                    <p style="color: #dc3545">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary px-4 pt-2">Thêm</button>
            </form>
        </div>
    </div>
</div>

@endsection