<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Status\MassDestroyStatusRequest;
use App\Http\Requests\Status\StoreStatusRequest;
use App\Http\Requests\Status\UpdateStatusRequest;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\DataTables;

class StatusController extends Controller
{
    public function index(Request $request)
    {
        abort_if(Gate::denies('status_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $status = Status::all();
            $table = DataTables::of($status);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="status[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $crudRoutePart = 'status';

                return view('components.datatableActions', compact(
                    'crudRoutePart',
                    'row'
                ));
            });

            $table->rawColumns(['checkbox', 'actions']);

            return $table->make(true);
        }

        return view('admin.status.index');
    }

    public function create()
    {
        abort_if(Gate::denies('status_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.status.create');
    }

    public function store(StoreStatusRequest $request)
    {
        $status = Status::create($request->validated());

        return redirect()->route('admin.status.index');
    }

    public function edit(Status $status)
    {
        abort_if(Gate::denies('status_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.status.edit', compact('status'));
    }

    public function update(UpdateStatusRequest $request, Status $status)
    {
        $status->update($request->validated());

        return redirect()->route('admin.status.index')->with('success', 'Cập nhật thành công!');
    }

    public function destroy(Status $status)
    {
        abort_if(Gate::denies('status_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $status->delete();

        return back();
    }

    public function massDestroy(MassDestroyStatusRequest $request)
    {
        Status::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
