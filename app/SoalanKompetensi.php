<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SoalanKompetensi extends Model
{
    protected $table = 'soalan_kompetensi';

    public function jawapan()
    {
        return $this->hasMany('App\JawapanKompetensi');
    }
}
