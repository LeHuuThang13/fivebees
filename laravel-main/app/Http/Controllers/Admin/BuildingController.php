<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Building;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\DataTables;

// Request validations
use App\Http\Requests\Building\MassDestroyBuildingRequest;
use App\Http\Requests\Building\StoreBuildingRequest;
use App\Http\Requests\Building\UpdateBuildingRequest;
use App\Models\Room;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class BuildingController extends Controller
{

    public function index(Request $request)
    {
        abort_if(Gate::denies('building_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $buildings = Building::all();
            $table = DataTables::of($buildings);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="buildings[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $viewGate = 'building_show';
                $editGate = 'building_edit';
                $deleteGate = 'building_delete';
                $crudRouteName = 'tòa nhà';
                $crudRoutePart = 'buildings';

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

            $table->addColumn('user', function ($row) {
                return $row->users ? $row->users->name : '';
            });

            $table->rawColumns(['checkbox', 'user', 'actions']);

            return $table->make(true);
        }

        return view('admin.buildings.index');
    }

    public function create()
    {
        abort_if(Gate::denies('building_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $users = User::whereHas('roles', function ($role) {
            $role->where('name', 'Owner');
        })->get();

        return view('admin.buildings.create', compact('users'));
    }

    public function store(StoreBuildingRequest $request)
    {
        $building = Building::create($request->validated());

        if ($request->hasFile('filenames')) {
            $fileAdders = $building->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return redirect()->route('admin.buildings.index')->with('success', 'Tạo tòa nhà thành công!');
    }

    public function show(Building $building)
    {
        abort_if(Gate::denies('building_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $photos = $building->getMedia('photos');

        $rooms = Room::where('building_id', $building->id)->get();

        return view('admin.buildings.show', compact('building', 'photos', 'rooms'));
    }

    public function edit(Building $building)
    {
        abort_if(Gate::denies('building_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $users = User::whereHas('roles', function ($role) {
            $role->where('name', 'Owner');
        })->get();

        $photos = $building->getMedia('photos');

        return view('admin.buildings.edit', compact('users', 'building', 'photos'));
    }

    public function update(UpdateBuildingRequest $request, Building $building)
    {
        $building->update($request->validated());

        if ($request->hasFile('filenames')) {
            $building = Building::where('id', $building->id)->firstOrFail();

            $fileAdders = $building->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return redirect()->route('admin.buildings.index')->with('success', 'Cập nhật tòa nhà thành công!');
    }

    public function destroy(Building $building)
    {
        abort_if(Gate::denies('building_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $building->delete();

        return back()->with('success', 'Xóa tòa nhà thành công!');
    }

    public function massDestroy(MassDestroyBuildingRequest $request)
    {
        Building::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function deleteMedia(Request $request)
    {
        $mediaTodelete = Media::where('id', $request->input('photo_id'))->first()->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
