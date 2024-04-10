<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes, HasUlids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question',
        'answer',
        'is_answered',
        'is_anonymous',
        'page_id',
        'sender_id',
        'streamed',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class);
    }

}
