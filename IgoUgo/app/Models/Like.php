<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'like_id';

    public $timestamps = false;

    protected $fillable = [
        'board_id'
        ,'user_id'
        ,'like_flg'
    ];
}
