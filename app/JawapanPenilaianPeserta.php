<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JawapanPenilaianPeserta extends Model
{
    protected $table = 'jawapan_penilaian_peserta';

    public function peserta()
    {
        return $this->belongsTo('App\Peserta');
    }

    public function skop()
    {
        return $this->belongsTo('App\SkopPenilaianLatihan', 'skop_penilaian_latihan_id');
    }
}
