<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Page extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'header_image_path',
        'username',
        'username_updated_at',
        'bio',
        'is_accepting_questions',
        'allow_anon_questions',
        'user_id',
        'overlay_key',
    ];

    protected $append = [
        'header_image_url',
    ];

    public function getHeaderImageUrlAttribute()
    {
        return $this->header_image_path ? Storage::url($this->header_image_path) : 'https://placehold.co/1920x1080';
    }

    public static function boot()
    {
        parent::boot();

        //append
        static::retrieved(function ($page) {
            $page->append('header_image_url');
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //socials
    public function social()
    {
        return $this->hasMany(UserSocial::class);
    }

    //question
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

}
