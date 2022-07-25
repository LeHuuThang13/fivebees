@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Tiện ích | FiveBees')

@section('content')

<div class="info-container" style="margin-right: 2rem">
    <div class="container px-0 py-2 bg-white table-container mb-4" style="border-radius: 10px">
        <h3 class="mt-2 mx-3">In biên bản kiểm kê thiết bị phòng</h3>
        <hr>
        <table class="table">
            <thead style="background-color: #F5F9FC;">
                <tr>
                    <th scope="col">số phòng</th>
                    <th scope="col">trạng thái</th>
                    <th class="text-center" scope="col">tổng số thiết bị</th>
                    <th class="text-center" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                @foreach($rooms as $room)
                <tr>
                    <td class="align-middle">{{$room->room_number}} ({{$room->buildings->name}})</td>
                    <td class="align-middle">{{$room->status}}</td>
                    <td class="align-middle text-center">{{$room->facilities->count()}}</td>
                    <td class="align-middle text-center">
                        <form action="{{route('admin.utilities.print', $room->id)}}" method="GET" style="margin-bottom: 0;">
                            <button type="submit" class="btn btn-link print-button" style="padding: 0">
                                <span class="material-symbols-outlined" data-bs-toggle="tooltip" title="In biên bản">
                                    print
                                </span>
                            </button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@endsection