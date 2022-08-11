<?php

namespace App\Http\Resources;

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
            'building_id' => $this->building_id,
            'photos' => $photos,
            'facilities' => [
                'id' => $this->facilities->last()->id,
                'code' => $this->facilities->last()->code,
                'name' => $this->facilities->last()->name,
                'description' => $this->facilities->last()->description,
                'status' => $this->facilities->last()->status->name,
                'category' => $this->facilities->last()->categories->name,
                'created_at' => $this->facilities->last()->created_at,
                'updated_at' => $this->facilities->last()->updated_at,
            ],
        ];
    }
}
