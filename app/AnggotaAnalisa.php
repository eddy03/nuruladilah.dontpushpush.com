<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnggotaAnalisa extends Model
{
    protected $table = 'anggota_analisa';

    protected $fillable = ['nama', 'siri', 'jawatan'];

    public function bahagian()
    {
        return $this->belongsTo('App\Bahagian');
    }

    public function jawapanKompetensi()
    {
        return $this->hasMany('App\JawapanKompetensi');
    }

    public function jawapanBhgA()
    {
        return $this->hasMany('App\JawapanAnalisaBhgA');
    }

    public function jawapanBhgB()
    {
        return $this->hasMany('App\JawapanAnalisaBhgB');
    }
}
