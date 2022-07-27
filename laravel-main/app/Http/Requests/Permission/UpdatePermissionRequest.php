<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdatePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('permission_edit');
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
                'string',
                'unique:permissions,name,' . request()->route('permission')->id,
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên của role",
            'name.string' => "Tên của role phải là chữ",
            'name.unique' => "Quyền đã tồn tại",
        ];
    }
}
