<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\SoalanKompetensi;
use App\SoalanAnalisaBhgA;
use App\AnalisaBahagianBahagianB;
use App\AnggotaAnalisa;
use App\Bahagian;
use App\JawapanKompetensi;
use App\JawapanAnalisaBhgB;
use App\AnalisaKursusBahagianB;
use App\JawapanAnalisaBhgA;
use App\SetJawapanSoalanAnalisaBhgA;

class AnalisaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $anggotaAnalisa = AnggotaAnalisa::all();

        foreach($anggotaAnalisa as $i => $anggota) {
            $anggotaAnalisa[$i]->bahagian = $anggota->bahagian;
        }

        return $anggotaAnalisa;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $anggota = $this->saveAnggota($request);
        $this->saveKompetensi($request, $anggota);
        $this->saveBhgA($request, $anggota);
        $this->saveBhgB($request, $anggota);

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
        $anggota = AnggotaAnalisa::findOrFail($id);

        $anggota->jawapanKompetensi;
        $anggota->jawapanBhgA;
        $anggota->jawapanBhgB;

        return $anggota;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $anggota = $this->saveAnggota($request, $id);
        $this->saveKompetensi($request, $anggota, false);
        $this->saveBhgA($request, $anggota, false);
        $this->saveBhgB($request, $anggota, false);

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
        $anggota = AnggotaAnalisa::findOrFail($id);

        $anggota->jawapanKompetensi;
        $anggota->jawapanBhgA;
        $anggota->jawapanBhgB;

        foreach($anggota->jawapanBhgB as $jwpBhgB) {
            $jwpBhgB->delete();
        }

        foreach($anggota->jawapanBhgA as $jwpBhgA) {
            $jwpBhgA->delete();
        }

        foreach($anggota->jawapanKompetensi as $jwpKompetensi) {
            $jwpKompetensi->delete();
        }

        $anggota->delete();

        return ['success' => true];
    }

    public function soalan()
    {
        $soalanKompetensi = SoalanKompetensi::all(['id', 'soalan', 'penerangan']);

        $soalanBhgA = SoalanAnalisaBhgA::with(['setJawapan' => function($query) {
            $query->select(['id', 'jawapan', 'soalan_analisa_bhg_a_id']);
        }])->get(['id', 'soalan']);

        $soalanBhgB = AnalisaBahagianBahagianB::with(['kursus' => function($query) {
            $query->select(['id', 'kursus', 'analisa_bahagian_bahagian_b_id']);
        }])->get(['id', 'bahagian']);

        return compact('soalanKompetensi', 'soalanBhgA', 'soalanBhgB');
    }

    private function saveAnggota($request, $id = null)
    {
        $anggota = $request->get('anggota');
        $bahagian = Bahagian::find($anggota['bahagian']);

        if(is_null($id)) {
            return $bahagian->anggota()->save(new AnggotaAnalisa($anggota));
        } else {
            $anggotaObj = AnggotaAnalisa::find($id);
            $anggotaObj->fill($anggota);

            $anggotaObj->bahagian()->associate($bahagian);

            return $anggotaObj->save();
        }
    }

    private function saveKompetensi($request, $anggota, $new = true)
    {
        foreach($request->get('kompetensi') as $kompetensi) {

            if($new) {
                $soalanKompetensi = SoalanKompetensi::findOrFail($kompetensi['id']);

                $jawapanKebolehanSendiri = new JawapanKompetensi();
                $jawapanKebolehanPenyelia = new JawapanKompetensi();
                $jawapanKeperluanSendiri = new JawapanKompetensi();
                $jawapanKeperluanPenyelia = new JawapanKompetensi();
            } else {
                $jawapanKebolehanSendiri = JawapanKompetensi::findOrFail($kompetensi['kebolehan']['jawapanAndaId']);
                $jawapanKebolehanPenyelia = JawapanKompetensi::findOrFail($kompetensi['kebolehan']['jawapanPenyeliaId']);
                $jawapanKeperluanSendiri = JawapanKompetensi::findOrFail($kompetensi['keperluan']['jawapanAndaId']);
                $jawapanKeperluanPenyelia = JawapanKompetensi::findOrFail($kompetensi['keperluan']['jawapanPenyeliaId']);
            }

            $jawapanKebolehanSendiri->jenis_penilaian = 1;
            $jawapanKebolehanSendiri->diri_sendiri = true;
            $jawapanKebolehanSendiri->jawapan = isset($kompetensi['kebolehan']['anda'])? $kompetensi['kebolehan']['anda'] : 0;

            $jawapanKebolehanPenyelia->jenis_penilaian = 1;
            $jawapanKebolehanPenyelia->diri_sendiri = false;
            $jawapanKebolehanPenyelia->jawapan = isset($kompetensi['kebolehan']['penyelia'])? $kompetensi['kebolehan']['penyelia'] : 0;

            $jawapanKeperluanSendiri->jenis_penilaian = 2;
            $jawapanKeperluanSendiri->diri_sendiri = true;
            $jawapanKeperluanSendiri->jawapan = isset($kompetensi['keperluan']['anda'])? $kompetensi['keperluan']['anda'] : 0;

            $jawapanKeperluanPenyelia->jenis_penilaian = 2;
            $jawapanKeperluanPenyelia->diri_sendiri = false;
            $jawapanKeperluanPenyelia->jawapan = isset($kompetensi['keperluan']['penyelia'])? $kompetensi['keperluan']['penyelia'] : 0;

            if($new) {
                $soalanKompetensi->jawapan()->saveMany([
                    $jawapanKebolehanSendiri,
                    $jawapanKebolehanPenyelia,
                    $jawapanKeperluanSendiri,
                    $jawapanKeperluanPenyelia
                ]);

                $jawapanKebolehanSendiri->anggota()->associate($anggota);
                $jawapanKebolehanSendiri->save();

                $jawapanKebolehanPenyelia->anggota()->associate($anggota);
                $jawapanKebolehanPenyelia->save();

                $jawapanKeperluanSendiri->anggota()->associate($anggota);
                $jawapanKeperluanSendiri->save();

                $jawapanKeperluanPenyelia->anggota()->associate($anggota);
                $jawapanKeperluanPenyelia->save();
            } else {
                $jawapanKebolehanSendiri->save();
                $jawapanKebolehanPenyelia->save();
                $jawapanKeperluanSendiri->save();
                $jawapanKeperluanPenyelia->save();
            }
        }
    }

    private function saveBhgA($request, $anggota, $new = true)
    {
        foreach($request->get('bahagianA') as $bhgA) {
            if(count($bhgA['set_jawapan']) == 2) {

                $jawapan = ($new)? new JawapanAnalisaBhgA() : JawapanAnalisaBhgA::findOrFail($bhgA['jawapanId']);
                $jawapan->jawapan = isset($bhgA['jawapan'])? $bhgA['jawapan'] : 0;

                if($new) {
                    $soalan = SoalanAnalisaBhgA::findOrFail($bhgA['id']);
                    $soalan->jawapan()->save($jawapan);

                    $jawapan->anggota()->associate($anggota);
                }

                $jawapan->save();

            } else {

                foreach($bhgA['set_jawapan'] as $setJawapan) {

                    if($new) {
                        $jawapan = new JawapanAnalisaBhgA();
                        $jawapan->jawapan = isset($setJawapan['answer'])? true : false;

                        $jawapanObjects = SetJawapanSoalanAnalisaBhgA::findOrFail($setJawapan['id']);
                        $jawapanObjects->jawapan()->save($jawapan);

                        $jawapan->anggota()->associate($anggota);
                    } else {
                        $jawapan = JawapanAnalisaBhgA::findOrFail($setJawapan['answerId']);
                        $jawapan->jawapan = $setJawapan['answer'];
                    }

                    $jawapan->save();
                }
            }
        }
    }

    private function saveBhgB($request, $anggota, $new = true)
    {
        foreach($request->get('bahagianB') as $bahagian) {

            foreach($bahagian['kursus'] as $kursus) {

                if($new) {
                    $jawapan = new JawapanAnalisaBhgB();
                } else {
                    $jawapan = JawapanAnalisaBhgB::findOrFail($kursus['jawapanId']);
                }

                $jawapan->jawapan = isset($kursus['jawapan'])? $kursus['jawapan'] : 0;

                if(isset($bahagian['cadangan'])) {
                    $jawapan->cadangan = $bahagian['cadangan'];
                }

                if($new) {
                    $kursusObj = AnalisaKursusBahagianB::findOrFail($kursus['id']);
                    $kursusObj->jawapan()->save($jawapan);

                    $jawapan->anggota()->associate($anggota);
                }

                $jawapan->save();
            }
        }
    }
}
