<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JawapanAnalisaBhgB extends Model
{
    protected $table = 'jawapan_analisa_bhg_b';

    public function soalan()
    {
        return $this->belongsTo('app\AnalisaKursusBahagianB');
    }

    public function anggota()
    {
        return $this->belongsTo('App\AnggotaAnalisa', 'anggota_analisa_id');
    }
}
