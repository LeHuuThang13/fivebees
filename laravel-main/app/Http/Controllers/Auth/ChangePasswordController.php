<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    public function edit()
    {
        abort_if(Gate::denies('user_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('auth.changePassword');
    }

    public function update(ChangePasswordRequest $request)
    {
        $user = auth()->user();
        $user->update($request->validated());

        return redirect()->route('changepassword')->with('message', 'Đổi mật khẩu thành công');
    }
}
