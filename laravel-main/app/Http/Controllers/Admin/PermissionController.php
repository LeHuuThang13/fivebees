<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Yajra\DataTables\DataTables;

// Request validations
use App\Http\Requests\Permission\MassDestroyPermissionRequest;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        abort_if(Gate::denies('permission_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $permissions = Permission::all();
            $table = DataTables::of($permissions);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="permissions[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $viewGate = 'permission_show';
                $editGate = 'permission_edit';
                $deleteGate = 'permission_delete';
                $crudRouteName = 'quyền';
                $crudRoutePart = 'permissions';

                return view('components.datatableActions', compact(
                    'viewGate',
                    'editGate',
                    'deleteGate',
                    'crudRouteName',
                    'crudRoutePart',
                    'row'
                ));
            });

            $table->rawColumns(['checkbox', 'actions']);

            return $table->make(true);
        }

        return view('admin.permissions.index');
    }

    public function create()
    {
        abort_if(Gate::denies('permission_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.permissions.create');
    }

    public function store(StorePermissionRequest $request)
    {
        $actions = $request->actions;
        $name = $request->name;

        foreach ($actions as $action)
            $permission = Permission::create([
                'name' => $name . $action
            ]);

        return redirect()->route('admin.permissions.index')->with('success', 'Tạo permission thành công!');
    }

    public function edit(Permission $permission)
    {
        abort_if(Gate::denies('permission_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.permissions.edit', compact('permission'));
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update($request->validated());

        return redirect()->route('admin.permissions.index')->with('success', 'Cập nhật permission thành công!');
    }

    public function destroy(Permission $permission)
    {
        abort_if(Gate::denies('permission_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $permission->delete();

        return back()->with('success', 'Xóa permission thành công!');
    }

    public function massDestroy(MassDestroyPermissionRequest $request)
    {
        Permission::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
