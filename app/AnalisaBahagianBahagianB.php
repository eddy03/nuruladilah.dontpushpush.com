<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnalisaBahagianBahagianB extends Model
{
    protected $table = 'analisa_bahagian_bahagian_b';

    public function kursus()
    {
        return $this->hasMany('App\AnalisaKursusBahagianB');
    }
}
