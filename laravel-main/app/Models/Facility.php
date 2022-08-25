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

class Facility extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;
    use InteractsWithMedia;

    public $table = 'facilities';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'name',
        'description',
        'code',
        'status_id',
        'category_id',
        'created_by_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'facilities_rooms_pivot', 'facility_id', 'room_id')->withTimestamps();
    }

    public function categories()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
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
