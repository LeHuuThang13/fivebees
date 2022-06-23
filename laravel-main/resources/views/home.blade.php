@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title') {{ 'home' }} @endsection

@section('content')

<div class="info-container d-flex flex-row">
    <div class="info-block bg-white rounded">
        Hello world
    </div>

    <div class="info-block bg-white rounded">
        Hello world
    </div>

    <div class="info-block bg-white rounded">
        Hello world
    </div>

    <div class="info-block bg-white rounded">
        Hello world
    </div>
</div>

@endsection