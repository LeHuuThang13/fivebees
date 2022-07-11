<?php

namespace App\Http\Requests\Building;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateBuildingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('building_edit');
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
            ],
            'address' => [
                'required',
            ],
            'user_id' => [
                'nullable'
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên của tòa nhà",
            'address.required' => "Vui lòng nhập địa chỉ của tòa nhà",
            'user_id' => "Chủ sở hữu không được bỏ trống"
        ];
    }
}
