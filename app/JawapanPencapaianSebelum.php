<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JawapanPencapaianSebelum extends Model
{
    protected $table = 'jawapan_pencapaian_sebelum';

    public function peserta()
    {
        return $this->belongsTo('App\Peserta');
    }

    public function skop()
    {
        return $this->belongsTo('App\SkopPencapaianLatihan', 'skop_pencapaian_latihan_id');
    }

    public function pencapaianSelepas()
    {
        return $this->hasOne('App\JawapanPencapaianSelepas');
    }
}
