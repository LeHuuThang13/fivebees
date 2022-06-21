@extends('components.layout')

@section('title') {{ 'home' }} @endsection

@section('content')

<form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit" class="btn btn-primary">Đăng xuất</button>
</form>

@endsection