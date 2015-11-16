<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BahagianPencapaianLatihan extends Model
{
    protected $table = 'bahagian_pencapaian_latihan';

    public function skop()
    {
        return $this->hasMany('App\SkopPencapaianLatihan');
    }
}
