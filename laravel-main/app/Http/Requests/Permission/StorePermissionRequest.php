<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StorePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('permission_create');
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
                'unique:permissions'
            ],
            'actions' => [
                'required',
                'array'
            ],
            'actions.*' => [
                'string',
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên của quyền",
            'name.unique' => "Quyền đã tồn tại",
            'actions.required' => "Vui lòng chọn hành động"
        ];
    }
}
