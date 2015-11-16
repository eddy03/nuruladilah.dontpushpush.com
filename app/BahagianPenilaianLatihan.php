<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BahagianPenilaianLatihan extends Model
{
    protected $table = 'bahagian_penilaian_latihan';

    public function skop()
    {
        return $this->hasMany('App\SkopPenilaianLatihan');
    }
}
