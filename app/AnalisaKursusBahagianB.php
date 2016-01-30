<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnalisaKursusBahagianB extends Model
{
    protected $table = 'analisa_kursus_bahagian_b';

    public function bahagian()
    {
        return $this->belongsTo('App\AnalisaBahagianBahagianB');
    }

    public function jawapan()
    {
        return $this->hasMany('app\JawapanAnalisaBhgB');
    }
}
