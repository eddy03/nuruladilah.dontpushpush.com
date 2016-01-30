<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SetJawapanSoalanAnalisaBhgA extends Model
{
    protected $table = 'set_jawapan_soalan_analisa_bhg_a';

    public function soalan()
    {
        return $this->belongsTo('App\SoalanAnalisaBhgA');
    }

    public function jawapan()
    {
        return $this->hasMany('App\JawapanAnalisaBhgA');
    }
}
