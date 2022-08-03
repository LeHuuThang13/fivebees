<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Building;
use App\Models\Room;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class RoomApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('room_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $rooms = Room::with(['owner', 'buildings'])->get();

        return RoomResource::collection($rooms);
    }

    public function show(Room $room)
    {
        abort_if(Gate::denies('room_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new RoomResource($room->load(['buildings', 'owner']));
    }

    public function store(StoreRoomRequest $request)
    {
        $building_id = Building::where('id', $request->input('building_id'))->where('user_id', Auth::id())->get('id');

        if ($building_id->count() > 0) {
            $room = Room::create([
                'room_number' => $request->input('room_number'),
                'description' => $request->input('description'),
                'status' => $request->input('status'),
                'building_id' => $request->input('building_id'),
                'created_by_id' => Auth::id(),
            ]);

            if ($request->hasFile('filenames')) {
                $fileAdders = $room->addMultipleMediaFromRequest(['filenames'])
                    ->each(function ($fileAdder) {
                        $fileAdder->toMediaCollection('photos');
                    });
            }
        } else {
            return response(null, Response::HTTP_CONFLICT);
        }

        return (new RoomResource($room))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $room->update($request->validated());

        if ($request->hasFile('filenames')) {
            $room = Room::where('id', $room->id)->firstOrFail();

            $fileAdders = $room->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return (new RoomResource($room))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function destroy(Room $room)
    {
        abort_if(Gate::denies('room_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $room->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
