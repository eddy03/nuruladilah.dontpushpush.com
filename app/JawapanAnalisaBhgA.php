<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JawapanAnalisaBhgA extends Model
{
    protected $table = 'jawapan_analisa_bhg_a';

    public function soalan()
    {
        return $this->belongsTo('App\SoalanAnalisaBhgA');
    }

    public function setJawapan()
    {
        return $this->belongsTo('App\SetJawapanSoalanAnalisaBhgA');
    }

    public function anggota()
    {
        return $this->belongsTo('App\AnggotaAnalisa', 'anggota_analisa_id');
    }
}
