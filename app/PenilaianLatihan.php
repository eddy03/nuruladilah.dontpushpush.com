<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PenilaianLatihan extends Model
{
    protected $table = 'penilaian_latihan';

    protected $fillable = ['tajuk', 'tempat', 'penganjur', 'bilanganPeserta', 'tarikh'];

    public function peserta()
    {
        return $this->hasMany('App\Peserta');
    }
}
