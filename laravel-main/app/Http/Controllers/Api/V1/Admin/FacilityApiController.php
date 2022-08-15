<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Facility\StoreFacilityRequest;
use App\Http\Requests\Facility\UpdateFacilityRequest;
use App\Http\Resources\FacilityResource;
use App\Models\Facility;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class FacilityApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('facility_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $facilities = Facility::with(['rooms', 'categories', 'status'])->get();

        return FacilityResource::collection($facilities);
    }

    public function show(Facility $facility)
    {
        abort_if(Gate::denies('facility_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FacilityResource($facility->load(['rooms', 'categories', 'status']));
    }

    public function store(StoreFacilityRequest $request)
    {
        $facility = Facility::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'code' => $this->generateCode($request),
            'category_id' => $request->input('category_id'),
            'status_id' => $request->input('status_id'),
            'created_by_id' => Auth::id(),
        ]);

        if ($request->input('status_id') == 1 || $request->input('status_id') == 3) {
            $facility->rooms()->sync($request->room_id);
        }

        if ($request->hasFile('filenames')) {
            $fileAdders = $facility->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return (new FacilityResource($facility))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateFacilityRequest $request, Facility $facility)
    {
        $facility->update($request->validated());

        if ($request->input('status_id') == 1 || $request->input('status_id') == 3) {
            $facility->rooms()->sync($request->room_id);
        }

        if ($request->hasFile('filenames')) {
            $facility = Facility::where('id', $facility->id)->firstOrFail();

            $fileAdders = $facility->addMultipleMediaFromRequest(['filenames'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('photos');
                });
        }

        return (new FacilityResource($facility))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function destroy(Facility $facility)
    {
        abort_if(Gate::denies('facility_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $facility->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function generateCode($request)
    {
        $code = '';
        $count = Facility::all()->count();
        if ($count >= 1000) {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-" . (Facility::all()->count() + 1); // 1-1001
        } else if ($count >= 100) {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-0" . (Facility::all()->count() + 1); // 1-0101
        } else if ($count >= 10) {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-00" . (Facility::all()->count() + 1); // 1-0011
        } else {
            $code = Carbon::now()->format('Ymd-his') . "-" . Auth::id() . "-000" . (Facility::all()->count() + 1); // 1-0001
        }
        return $code;
    }

    public function getListDamagedFacility()
    {
        abort_if(Gate::denies('facility_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $facilities = Facility::where('status_id', '=', 3)->with(['rooms', 'categories', 'status'])->get();

        return FacilityResource::collection($facilities);
    }
}
