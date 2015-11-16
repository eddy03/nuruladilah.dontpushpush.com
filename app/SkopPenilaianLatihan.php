<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkopPenilaianLatihan extends Model
{
    protected $table = 'skop_penilaian_latihan';

    public function bahagian()
    {
        return $this->belongsTo('App\BahagianPenilaianLatihan');
    }

    public function jawapan()
    {
        return $this->hasMany('App\JawapanPenilaianPeserta');
    }
}
