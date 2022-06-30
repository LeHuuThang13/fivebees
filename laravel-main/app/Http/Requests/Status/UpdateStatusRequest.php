<?php

namespace App\Http\Requests\Status;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('status_edit');
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
                'unique:status'
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên tài khoản",
            'name.unique' => "Trạng thái đã tồn tại",
        ];
    }
}
