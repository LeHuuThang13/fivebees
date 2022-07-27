<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BuildingResource extends JsonResource
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
            'address' => $this->address,
            'email' => $this->email,
            'hotline' => $this->hotline,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'photos' => $photos,
            'rooms' => $this->rooms,
        ];
    }
}
