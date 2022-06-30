<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\DataTables;

// Request validations
use App\Http\Requests\User\MassDestroyUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;

class UserController extends Controller
{

    public function index(Request $request)
    {
        abort_if(Gate::denies('user_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        if ($request->ajax()) {
            $users = User::with(['roles'])->get();
            $table = Datatables::of($users);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="users[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $crudRoutePart = 'users';

                return view('components.datatableActions', compact(
                    'crudRoutePart',
                    'row'
                ));
            });

            $table->addColumn('role', function ($row) {
                $labels = [];
                foreach ($row->roles as $role) {
                    if ($role->name === 'Admin') {
                        $labels[] = sprintf('<span class="badge text-bg-primary">%s</span>', $role->name);
                    } else if ($role->name === 'Owner') {
                        $labels[] = sprintf('<span class="badge text-bg-info text-white">%s</span>', $role->name);
                    } else {
                        $labels[] = sprintf('<span class="badge text-bg-secondary">%s</span>', $role->name);
                    }
                }
                return implode(' ', $labels);
            });

            $table->rawColumns(['checkbox', 'role', 'actions']);

            return $table->make(true);
        }

        return view('admin.users.index');
    }

    public function create()
    {
        abort_if(Gate::denies('user_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $roles = Role::pluck('name', 'id');
        return view('admin.users.create', compact('roles'));
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        $user->roles()->sync($request->input('roles', []));

        return redirect()->route('admin.users.index')->with('success', 'Tạo user thành công!');
    }

    public function edit(User $user)
    {
        abort_if(Gate::denies('user_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $roles = Role::pluck('name', 'id');

        $user->load('roles');

        return view('admin.users.edit', compact('roles', 'user'));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        $user->roles()->sync($request->input('roles', []));

        return redirect()->route('admin.users.index')->with('success', 'Cập nhật thành công!');
    }

    public function destroy(User $user)
    {
        abort_if(Gate::denies('user_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $user->delete();

        return back();
    }

    public function massDestroy(MassDestroyUserRequest $request)
    {
        User::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
