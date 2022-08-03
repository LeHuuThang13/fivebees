<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusResource;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusApiController extends Controller
{
    public function index()
    {
        $status = Status::all();

        return StatusResource::collection($status);
    }
}
