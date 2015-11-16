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
use App\SkopPencapaianLatihan;
use App\SkopPenilaianLatihan;

class JawapanPenilaianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $penilaian_latihan = BahagianPenilaianLatihan::with('skop')->get();
        $pencapaian_latihan = BahagianPencapaianLatihan::with('skop')->get();

        return ['pencapaian_latihan' => $pencapaian_latihan, 'penilaian_latihan' => $penilaian_latihan];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $form = $request->all();

        //Cari penilaian latihan
        $penilaianLatihan = PenilaianLatihan::find($form['id']);

        //Save and relation peserta to penilaian latihan
        $peserta = new Peserta($form);
        $peserta = $penilaianLatihan->peserta()->save($peserta);

        //Saving Jawapan Penilaian
        foreach($form['senaraiPenilaian'] as $bahagianPenilaian) {

            foreach($bahagianPenilaian['skop'] as $skopPenilaian) {

                //Create new jawapan penilaian peserta and relation to peserta
                $jawapanPenilaian = new JawapanPenilaianPeserta();
                $jawapanPenilaian->jawapan = (int)$skopPenilaian['jawapan'];
                $jawapanPenilaian = $peserta->jawapanPenilaianPeserta()->save($jawapanPenilaian);

                //Relation jawapan penilaian peserta to skop
                $skop = SkopPenilaianLatihan::find($skopPenilaian['id']);
                $jawapanPenilaian->skop()->associate($skop);
                $jawapanPenilaian->save();
            }
        }

        //Saving Jawapan Pencapaian
        foreach($form['senaraiPencapaian'] as $bahagianPencapaian) {

            foreach($bahagianPencapaian['skop'] as $skopPencapaian) {

                //Skop pencapaian
                $skop = SkopPencapaianLatihan::find($skopPencapaian['id']);

                //Create new jawapan pencapaian sebelum peserta and relation to peserta
                $jawapanPencapaianSebelum = new JawapanPencapaianSebelum();
                $jawapanPencapaianSebelum->jawapan = $skopPencapaian['jawapanSebelum'];
                $jawapanPencapaianSebelum = $peserta->jawapanPencapaianSebelum()->save($jawapanPencapaianSebelum);

                //Relation jawapan pencapaian sebelum peserta to skop
                $jawapanPencapaianSebelum->skop()->associate($skop);
                $jawapanPencapaianSebelum->save();

                //Create new jawapan pencapaian selepas peserta and relation to peserta
                $jawapanPencapaianSelepas = new JawapanPencapaianSelepas();
                $jawapanPencapaianSelepas->jawapan = $skopPencapaian['jawapanSelepas'];
                $jawapanPencapaianSelepas = $peserta->jawapanPencapaianSelepas()->save($jawapanPencapaianSelepas);

                //Relation jawapan pencapaian selepas peserta to skop
                $jawapanPencapaianSelepas->skop()->associate($skop);
                $jawapanPencapaianSelepas->save();

                //Relation jawapan pencapaian selepas peserta with jawapan pencapaian sebelum peserta
                $jawapanPencapaianSelepas->pencapaianSebelum()->associate($jawapanPencapaianSebelum);
                $jawapanPencapaianSelepas->save();

            }

        }

        return ['success' => true];

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $peserta = Peserta::find($id);
        $peserta->penilaianLatihan;
        $peserta->jawapanPenilaianPeserta;
        $peserta->jawapanPencapaianSebelum;
        $peserta->jawapanPencapaianSelepas;

        return $peserta;
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
        $form = $request->all();

        //Remove Penilaian Latihan ID
        unset($form['id']);

        $peserta = Peserta::find($id);
        $peserta->fill($form);
        $peserta->save();

        //Saving Jawapan Penilaian
        foreach($form['senaraiPenilaian'] as $bahagianPenilaian) {

            foreach($bahagianPenilaian['skop'] as $skopPenilaian) {

                //find jawapan penilaian peserta and update it
                $jawapanPenilaian = JawapanPenilaianPeserta::find($skopPenilaian['jawapan_id']);
                $jawapanPenilaian->jawapan = (int)$skopPenilaian['jawapan'];
                $jawapanPenilaian->save();
            }
        }

        //Saving Jawapan Pencapaian
        foreach($form['senaraiPencapaian'] as $bahagianPencapaian) {

            foreach($bahagianPencapaian['skop'] as $skopPencapaian) {

                //Create new jawapan pencapaian sebelum peserta and relation to peserta
                $jawapanPencapaianSebelum = JawapanPencapaianSebelum::find($skopPencapaian['jawapanSebelum_id']);
                $jawapanPencapaianSebelum->jawapan = $skopPencapaian['jawapanSebelum'];
                $jawapanPencapaianSebelum->save();

                //Create new jawapan pencapaian selepas peserta and relation to peserta
                $jawapanPencapaianSelepas = JawapanPencapaianSelepas::find($skopPencapaian['jawapanSelepas_id']);
                $jawapanPencapaianSelepas->jawapan = $skopPencapaian['jawapanSelepas'];
                $jawapanPencapaianSelepas->save();

            }

        }


        return ['peserta' => $peserta, 'form' => $form];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $peserta = Peserta::find($id);
        $peserta->delete();

        return ['success' => true];
    }
}
