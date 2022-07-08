<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\MassDestroyRoomRequest;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Models\Building;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\DataTables;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        abort_if(Gate::denies('room_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $rooms = Room::all();
            $table = DataTables::of($rooms);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="rooms[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $viewGate = 'room_show';
                $editGate = 'room_edit';
                $deleteGate = 'room_delete';
                $crudRouteName = 'phòng';
                $crudRoutePart = 'rooms';

                return view('components.datatableActions', compact(
                    'viewGate',
                    'editGate',
                    'deleteGate',
                    'crudRouteName',
                    'crudRoutePart',
                    'row'
                ));
            });

            $table->editColumn('created_at', function ($row) {
                return $row->created_at ? $row->created_at->format('d/m/Y') : '';
            });

            $table->addColumn('building', function ($row) {
                return $row->buildings ? $row->buildings->name : '';
            });

            $table->rawColumns(['checkbox', 'building', 'actions']);

            return $table->make(true);
        }

        return view('admin.rooms.index');
    }

    public function show(Room $room)
    {
        abort_if(Gate::denies('room_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $photos = $room->getMedia('photos');

        return view('admin.rooms.show', compact('room', 'photos'));
    }

    public function create()
    {
        abort_if(Gate::denies('room_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $buildings = Building::all();

        return view('admin.rooms.create', compact('buildings'));
    }

    public function store(StoreRoomRequest $request)
    {
        $room = Room::create($request->validated());

        if ($request->hasFile('filenames')) {
            $fileAdders = $room->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return redirect()->route('admin.rooms.index')->with('success', 'Tạo phòng thành công!');
    }

    public function edit(Room $room)
    {
        abort_if(Gate::denies('room_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $buildings = Building::all();

        $photos = $room->getMedia('photos');

        return view('admin.rooms.edit', compact('room', 'buildings', 'photos'));
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

        return redirect()->route('admin.rooms.index')->with('success', 'Cập nhật phòng thành công!');
    }

    public function destroy(Room $room)
    {
        abort_if(Gate::denies('room_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $room->delete();

        return back()->with('success', 'Xóa phòng thành công!');
    }

    public function massDestroy(MassDestroyRoomRequest $request)
    {
        Room::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function deleteMedia(Request $request)
    {
        $mediaTodelete = Media::where('id', $request->input('photo_id'))->first()->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
