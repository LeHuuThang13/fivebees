<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
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
        'created_by_id',
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

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by_id', 'id');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    protected static function boot()
    {
        parent::boot();

        self::addGlobalScope(function (Builder $builder) {
            $user = Auth::user();
            if ($user) {
                if (!$user->hasRole('Admin')) {
                    $builder->where('created_by_id', auth()->id());
                }
            }
        });
    }
}
