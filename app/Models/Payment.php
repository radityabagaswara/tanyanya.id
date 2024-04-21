<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'amount',
        'status',
        'order_id',
        'transaction_time',
        'question_id',
    ];

    protected $hidden = [
        'order_id',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
