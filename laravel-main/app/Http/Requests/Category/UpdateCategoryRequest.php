<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('category_edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required',
                'regex:/^[\pL\s\-]+$/u',
                'unique:categories,name,' . request()->route('category')->id,
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên loại thiết bị",
            'name.unique' => "Loại thiết bị đã tồn tại",
        ];
    }
}
