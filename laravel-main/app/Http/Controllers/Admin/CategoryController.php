<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\DataTables;

// Request validations
use App\Http\Requests\Category\MassDestroyCategoryRequest;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        abort_if(Gate::denies('category_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $categories = Category::all();
            $table = DataTables::of($categories);

            $table->addColumn('checkbox', function ($row) {
                return '<input name="categories[]" value="' . $row->id . '" class="form-check-input checks" type="checkbox">';
            });

            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $viewGate = 'category_show';
                $editGate = 'category_edit';
                $deleteGate = 'category_delete';
                $crudRouteName = 'loại thiết bị';
                $crudRoutePart = 'categories';

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

        return view('admin.categories.index');
    }

    public function create()
    {
        abort_if(Gate::denies('category_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.categories.create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());

        return redirect()->route('admin.categories.index')->with('success', 'Tạo loại thiết bị thành công!');
    }

    public function edit(Category $category)
    {
        abort_if(Gate::denies('category_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.categories.edit', compact('category'));
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return redirect()->route('admin.categories.index')->with('success', 'Cập nhật loại thiết bị thành công!');
    }

    public function destroy(Category $category)
    {
        abort_if(Gate::denies('category_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $category->delete();

        return back()->with('success', 'Xóa loại thiết bị thành công!');
    }

    public function massDestroy(MassDestroyCategoryRequest $request)
    {
        Category::whereIn('id', $request->id)->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
