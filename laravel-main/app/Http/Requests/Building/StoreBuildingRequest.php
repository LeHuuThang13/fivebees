<?php

namespace App\Http\Requests\Building;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreBuildingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('building_create');
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
                'min: 3'
            ],
            'address' => [
                'required',
            ],
            'user_id' => [
                'nullable'
            ],
            'filenames' => [
                'required',
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên của tòa nhà",
            'name.min' => "Tên phải có ít nhất 3 ký tự",
            'address.required' => "Vui lòng nhập địa chỉ của tòa nhà",
            'filenames.required' => "Vui lòng chọn hình ảnh",
        ];
    }
}
