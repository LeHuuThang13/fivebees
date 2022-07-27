<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('role_edit');
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
                'unique:roles,name,' . request()->route('role')->id,
            ],
            'permissions.*' => [
                'integer',
            ],
            'permissions' => [
                'required',
                'array',
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên của vai trò",
            'name.string' => "Tên của vai trò phải là chữ",
            'name.unique' => "Vai trò đã tồn tại",
            'permissions.required' => "Vui lòng chọn các quyền",
        ];
    }
}
