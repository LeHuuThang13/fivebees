<?php

namespace App\Http\Requests\Facility;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateFacilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('facility_edit');
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
