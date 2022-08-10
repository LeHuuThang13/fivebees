<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\Facility\MassDesstroyFacilityRequest;
use App\Http\Requests\Facility\StoreFacilityRequest;
use App\Http\Requests\Facility\UpdateFacilityRequest;

use App\Models\Category;
use App\Models\Facility;
use App\Models\Room;
use App\Models\Status;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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

        $rooms = Room::all();

        $categories = Category::pluck('name', 'id');
        $status = Status::pluck('name', 'id');

        return view('admin.facilities.create', compact('rooms', 'categories', 'status'));
    }

    public function store(StoreFacilityRequest $request)
    {
        $facility = Facility::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'code' => $this->generateCode($request),
            'category_id' => $request->input('category_id'),
            'status_id' => $request->input('status_id'),
            'created_by_id' => $request->input('created_by_id'),
        ]);

        if ($request->hasFile('filenames')) {
            $fileAdders = $facility->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        if ($request->input('status_id') == 1 || $request->input('status_id') == 3) {
            $facility->rooms()->attach($request->room_id);
        }

        return redirect()->route('admin.facilities.index')->with('success', 'Tạo thiết bị thành công!');
    }

    public function show(Facility $facility)
    {
        abort_if(Gate::denies('facility_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $photos = $facility->getMedia('photos');

        $name = "name: " . $facility->name . "\n";
        $code = "code: " . $facility->code . "\n";
        $description = "description: " . $facility->description . "\n";
        $status = "status: " . $facility->status->name . "\n";
        $category = "category: " . $facility->categories->name;

        $facility_info = $name . $code . $description . $status . $category;
        $info = mb_convert_encoding($facility_info, 'UTF-8', 'ISO-8859-1');

        return view('admin.facilities.show', compact('facility', 'photos', 'info'));
    }

    public function edit(Facility $facility)
    {
        abort_if(Gate::denies('facility_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $photos = $facility->getMedia('photos');

        $rooms = Room::all();

        $categories = Category::pluck('name', 'id');
        $status = Status::pluck('name', 'id');

        return view('admin.facilities.edit', compact('facility', 'photos', 'categories', 'status', 'rooms'));
    }

    public function update(UpdateFacilityRequest $request, Facility $facility)
    {
        $facility->update($request->validated());

        if ($request->input('status_id') == 1 || $request->input('status_id') == 3) {
            $facility->rooms()->sync($request->room_id);
        }

        if ($request->hasFile('filenames')) {
            $facility = Facility::where('id', $facility->id)->firstOrFail();

            $fileAdders = $facility->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return redirect()->route('admin.facilities.index')->with('success', 'Cập nhật thiết bị thành công!');
    }

    public function destroy(Facility $facility)
    {
        abort_if(Gate::denies('facility_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $facility->delete();

        return back()->with('success', 'Xóa thiết bị thành công!');
    }

    public function massDestroy(MassDesstroyFacilityRequest $request)
    {
        Facility::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function deleteMedia(Request $request)
    {
        $mediaTodelete = Media::where('id', $request->input('photo_id'))->first()->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function generateCode($request)
    {
        $code = '';
        $count = Facility::all()->count();
        if ($count >= 1000) {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-" . (Facility::all()->count() + 1); // 1-1001
        } else if ($count >= 100) {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-0" . (Facility::all()->count() + 1); // 1-0101
        } else if ($count >= 10) {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-00" . (Facility::all()->count() + 1); // 1-0011
        } else {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-000" . (Facility::all()->count() + 1); // 1-0001
        }
        return $code;
    }
}
