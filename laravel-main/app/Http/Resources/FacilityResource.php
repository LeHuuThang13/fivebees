<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Status;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $photos = [];
        foreach ($this->getMedia('photos') as $photo) {
            array_push($photos, $photo->getUrl());
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'description' => $this->description,
            'status' => Status::where('id', $this->status_id)->select('id', 'name')->get(),
            'category' => Category::where('id', $this->category_id)->select('id', 'name')->get(),
            'room' => $this->rooms,
            'photos' => $photos
        ];
    }
}
