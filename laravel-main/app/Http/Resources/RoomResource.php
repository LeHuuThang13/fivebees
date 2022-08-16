<?php

namespace App\Http\Resources;

use App\Models\Building;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
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
            'room_number' => $this->room_number,
            'description' => $this->description,
            'status' => $this->status,
            'building_id' => Building::where('id', $this->building_id)->select('id', 'name')->get(),
            'photos' => $photos,
            'facilities' => $this->facilities,
        ];
    }
}
