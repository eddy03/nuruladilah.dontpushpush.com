<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Peserta extends Model
{
    protected $table = 'peserta';

    protected $fillable = [
        'nama',
        'markah_penilaian_A',
        'markah_penilaian_B',
        'markah_penilaian_C',
        'markah_pencapaian_A_sebelum',
        'markah_pencapaian_B_sebelum',
        'markah_pencapaian_C_sebelum',
        'markah_pencapaian_A_selepas',
        'markah_pencapaian_B_selepas',
        'markah_pencapaian_C_selepas'
    ];

    public function penilaianLatihan()
    {
        return $this->belongsTo('App\PenilaianLatihan');
    }

    public function jawapanPencapaianSebelum()
    {
        return $this->hasMany('App\JawapanPencapaianSebelum');
    }

    public function jawapanPencapaianSelepas()
    {
        return $this->hasMany('App\JawapanPencapaianSelepas');
    }

    public function jawapanPenilaianPeserta()
    {
        return $this->hasMany('App\JawapanPenilaianPeserta');
    }
}
