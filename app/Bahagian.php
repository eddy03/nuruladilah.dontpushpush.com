<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bahagian extends Model
{
    use SoftDeletes;

    protected $table = 'bahagian';

    protected $dates = ['deleted_at'];

    public function anggota()
    {
        return $this->hasMany('App\AnggotaAnalisa');
    }
}
