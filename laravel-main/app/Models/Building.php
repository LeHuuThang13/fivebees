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

class Building extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;
    use InteractsWithMedia;

    public $table = 'buildings';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'name',
        'address',
        'user_id',
        'email',
        'hotline',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class, 'building_id');
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
                if ($user->hasRole('Owner')) {
                    $builder->where('user_id', auth()->id());
                }
            }
        });
    }
}
