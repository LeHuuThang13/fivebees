<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function index(Facility $facility)
    {
        $photos = $facility->getMedia('photos');

        return view('user.facilities.index', compact('facility', 'photos'));
    }
}
