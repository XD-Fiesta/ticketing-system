<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Referal extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'referals';
    protected $guarded = ['id'];

    protected $fillable = [
        "nim",
        "phone",
        "code_referal",
        "status",
        "user_id"
    ];
}
