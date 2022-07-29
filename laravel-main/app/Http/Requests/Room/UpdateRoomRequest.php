<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('room_edit');
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
            'building_id' => [
                'required'
            ],
            'description' => [
                'required',
            ]
        ];
    }

    public function messages()
    {
        return [
            'room_number.required' => "Vui lòng nhập số phòng",
            'status.required' => "Vui lòng nhập trạng thái của phòng",
            'building_id.required' => "Vui lòng chọn tòa nhà",
            'description.required' => "Vui lòng nhập mô tả",
        ];
    }
}
