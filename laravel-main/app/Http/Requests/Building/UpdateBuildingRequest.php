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
                'min: 3',
            ],
            'address' => [
                'required',
                'min: 3',
            ],
            'user_id' => [
                'nullable'
            ],
            'hotline' => [
                'required',
                'numeric',
            ],
            'email' => [
                'required',
                'email'
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Vui lòng nhập tên của tòa nhà",
            'name.min' => "Tên phải có ít nhất 3 ký tự",
            'address.required' => "Vui lòng nhập địa chỉ của tòa nhà",
            'address.min' => "Địa chỉ phải có ít nhất 3 ký tự",
            'user_id' => "Chủ sở hữu không được bỏ trống",
            'hotline.required' => "Vui lòng nhập hotline của tòa nhà",
            'hotline.numeric' => "Hotline phải là ký tự số",
            'email.required' => "Vui lòng nhập email liên lạc của tòa nhà",
            'email.email' => "Email chưa đúng định dạng",
        ];
    }
}
