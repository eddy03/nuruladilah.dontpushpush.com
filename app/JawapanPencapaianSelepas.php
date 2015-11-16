<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JawapanPencapaianSelepas extends Model
{
    protected $table = 'jawapan_pencapaian_selepas';

    public function peserta()
    {
        return $this->belongsTo('App\Peserta');
    }

    public function skop()
    {
        return $this->belongsTo('App\SkopPencapaianLatihan', 'skop_pencapaian_latihan_id');
    }

    public function pencapaianSebelum()
    {
        return $this->belongsTo('App\JawapanPencapaianSebelum', 'jawapan_pencapaian_sebelum_id');
    }
}
