<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        abort_if(Gate::denies('user_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => ['required', 'min:6', 'confirmed'],
        ];
    }

    public function messages()
    {
        return [
            'password.required' => "Vui lòng nhập password tài khoản",
            'password.min' => "Mật khẩu phải có ít nhất 6 ký tự",
            'password.confirmed' => "Yêu cầu xác thực mật khẩu mới",
        ];
    }
}
