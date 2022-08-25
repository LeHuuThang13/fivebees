<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => [
                'required',
            ],
            'email' => [
                'required',
                'unique:users',
            ],
            'password' => [
                'required',
                'min:6',
                'confirmed'
            ],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Vui lòng nhập Email',
            'email.email' => 'Vui lòng nhập đúng định dạng email',
            'name.required' => 'Vui lòng nhập tên của bạn',
            'password.required' => 'Vui lòng nhập password',
            'password.confirmed' => "Yêu cầu xác thực mật khẩu mới",
        ];
    }
}
