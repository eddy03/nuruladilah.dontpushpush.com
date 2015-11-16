<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\BahagianPencapaianLatihan;
use App\BahagianPenilaianLatihan;
use App\PenilaianLatihan;
use App\Peserta;
use App\JawapanPencapaianSebelum;
use App\JawapanPencapaianSelepas;
use App\JawapanPenilaianPeserta;

class PenilaianLatihanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PenilaianLatihan::with('peserta')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $penilaian_latihan = new PenilaianLatihan($request->all());
        $penilaian_latihan->save();

        return $penilaian_latihan;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PenilaianLatihan::with('peserta')->where('id', $id)->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $penilaian_peserta = PenilaianLatihan::find($id);
        $penilaian_peserta->fill($request->all());
        $penilaian_peserta->save();

        return ['success' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $penilaian_peserta = PenilaianLatihan::find($id);
        $penilaian_peserta->delete();

        return ['success' => true];
    }
}
