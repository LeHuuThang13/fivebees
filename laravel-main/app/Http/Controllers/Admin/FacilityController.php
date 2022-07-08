<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Building;
use App\Models\Category;
use App\Models\Facility;
use App\Models\Room;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\DataTables;

class FacilityController extends Controller
{
    public function index(Request $request)
    {
        abort_if(Gate::denies('facility_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $facilities = Facility::all();
            $table = DataTables::of($facilities);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="facilities[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $viewGate = 'facility_show';
                $editGate = 'facility_edit';
                $deleteGate = 'facility_delete';
                $crudRouteName = 'thiết bị';
                $crudRoutePart = 'facilities';

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

            $table->editColumn('status', function ($row) {
                $labels = [];
                if ($row->status->id == 1) {
                    $labels[] = sprintf('<span class="badge rounded-pill text-bg-success">%s</span>', $row->status->name);
                } else if ($row->status->id == 2) {
                    $labels[] = sprintf('<span class="badge rounded-pill text-bg-warning">%s</span>', $row->status->name);
                } else if ($row->status->id == 3) {
                    $labels[] = sprintf('<span class="badge rounded-pill text-bg-danger">%s</span>', $row->status->name);
                } else if ($row->status->id == 4) {
                    $labels[] = sprintf('<span class="badge rounded-pill text-bg-secondary">%s</span>', $row->status->name);
                }

                return implode(' ', $labels);
            });

            $table->addColumn('category', function ($row) {
                return $row->categories ? $row->categories->name : '';
            });

            $table->rawColumns(['checkbox', 'status', 'category', 'actions']);

            return $table->make(true);
        }

        return view('admin.facilities.index');
    }

    public function create()
    {
        abort_if(Gate::denies('facility_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $buildings = Building::where('user_id', Auth::id())->pluck('id')->toArray();
        $rooms = Room::whereIn('building_id', $buildings)->pluck('room_number', 'id');

        $categories = Category::pluck('name', 'id');
        $status = Status::pluck('name', 'id');

        return view('admin.facilities.create', compact('rooms', 'categories', 'status'));
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
