<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkopPencapaianLatihan extends Model
{
    protected $table = 'skop_pencapaian_latihan';

    public function bahagian()
    {
        return $this->belongsTo('App\BahagianPencapaianLatihan');
    }

    public function jawapanSebelum()
    {
        return $this->hasMany('App\JawapanPencapaianSebelum');
    }

    public function jawapanSelepas()
    {
        return $this->hasMany('App\JawapanPencapaianSelepas');
    }
}
