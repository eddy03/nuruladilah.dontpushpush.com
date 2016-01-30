<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JawapanKompetensi extends Model
{
    protected $table = 'jawapan_kompetensi';

    public function soalan()
    {
        return $this->belongsTo('App\SoalanKompetensi');
    }

    public function anggota()
    {
        return $this->belongsTo('App\AnggotaAnalisa', 'anggota_analisa_id');
    }
}
