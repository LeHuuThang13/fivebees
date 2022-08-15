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
                'id' => $this->facilities->last()->id ?? null,
                'code' => $this->facilities->last()->code ?? null,
                'name' => $this->facilities->last()->name ?? null,
                'description' => $this->facilities->last()->description ?? null,
                'status' => $this->facilities->last()->status->name ?? null,
                'category' => $this->facilities->last()->categories->name ?? null,
                'created_at' => $this->facilities->last()->created_at ?? null,
                'updated_at' => $this->facilities->last()->updated_at ?? null,
            ],
        ];
    }
}
