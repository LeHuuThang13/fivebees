<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('room_create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'room_number' => [
                'required',
            ],
            'status' => [
                'required',
            ],
            'description' => [
                'required',
            ],
            'building_id' => [
                'required',
            ],
            'filenames' => [
                'required',
            ]
        ];
    }

    public function messages()
    {
        return [
            'room_number.required' => "Vui lòng nhập số phòng",
            'status.required' => "Vui lòng nhập trạng thái của phòng",
            'description.required' => "Vui lòng nhập mô tả",
            'building_id.required' => "Tòa nhà không được bỏ trống",
            'filenames.required' => "Vui lòng chọn hình ảnh"
        ];
    }
}
