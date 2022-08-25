<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Facility;
use App\Models\Room;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $buildings = Building::all();
        $rooms = Room::all();
        $facilities = Facility::all();

        if ($request->ajax()) {
            $tableFacilities = Facility::where('status_id', 1)->orWhere('status_id', 3)->get();
            $table = DataTables::of($tableFacilities);

            $table->editColumn('created_at', function ($row) {
                return $row->created_at ? $row->created_at->format('d/m/Y') : '';
            });

            $table->editColumn('status', function ($row) {
                $labels = [];
                if ($row->status->id == 1) {
                    $labels[] = sprintf('<span class="badge rounded-pill text-bg-success">%s</span>', $row->status->name);
                } else if ($row->status->id == 3) {
                    $labels[] = sprintf('<span class="badge rounded-pill text-bg-danger">%s</span>', $row->status->name);
                }

                return implode(' ', $labels);
            });

            $table->editColumn('room', function ($row) {
                if ($row->rooms->last()) {
                    $building = Building::where('id', $row->rooms->last()->building_id)->first();
                    if ($building) {
                        return $row->rooms->last()->room_number . " (" . $building->name . ")";
                    }
                }
                return "Đang cập nhật";
            });

            $table->rawColumns(['checkbox', 'status', 'room', 'actions']);

            return $table->make(true);
        }

        return view('home', compact('buildings', 'facilities', 'rooms'));
    }
}
