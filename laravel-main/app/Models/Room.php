<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Room extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;
    use InteractsWithMedia;

    public $table = 'rooms';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'room_number',
        'description',
        'status',
        'building_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function buildings()
    {
        return $this->belongsTo(Building::class, 'building_id');
    }

    public function facilities()
    {
        return $this->belongsToMany(Facility::class, 'facilities_rooms_pivot', 'room_id', 'facility_id')->withTimestamps();
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
