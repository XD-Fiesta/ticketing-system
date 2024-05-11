<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class event extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "name_event",
        "type",
        "price",
        "location_event",
        "date_start",
        "date_end",
        "description",
    ];
}
