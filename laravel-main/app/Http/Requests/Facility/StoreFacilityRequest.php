<?php

namespace App\Http\Requests\Facility;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreFacilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('facility_create');
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
            'description' => [
                'required',
            ],
            'code' => [
                'nullable',
            ],
            'category_id' => [
                'integer',
            ],
            'status_id' => [
                'integer',
            ],
            'room_id' => [
                'nullable',
            ],
            'filenames' => [
                'required',
            ],
            'created_by_id' => [
                'integer'
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên thiết bị",
            'name.min' => "Tên phải có ít nhất 3 ký tự",
            'description.required' => "Vui lòng nhập mô tả",
            'filenames.required' => "Vui lòng chọn hình ảnh",
        ];
    }
}
