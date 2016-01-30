<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SoalanAnalisaBhgA extends Model
{
    protected $table = 'soalan_analisa_bhg_a';

    public function setJawapan()
    {
        return $this->hasMany('App\SetJawapanSoalanAnalisaBhgA');
    }

    public function jawapan()
    {
        return $this->hasMany('App\JawapanAnalisaBhgA');
    }
}
