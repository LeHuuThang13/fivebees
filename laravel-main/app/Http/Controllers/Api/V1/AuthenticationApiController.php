<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationApiController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (!auth()->attempt($request->validated())) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'password' => [
                        'Invalid credentials'
                    ],
                ]
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('token-name')->plainTextToken;
        return response()->json(['access_token' => $token, 'user' => $user]);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        $user->assignRole('Customer');
        $token = $user->createToken('token-name')->plainTextToken;
        return response()->json(['access_token' => $token, 'user' => new UserResource($user)]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout successfully']);
    }
}
