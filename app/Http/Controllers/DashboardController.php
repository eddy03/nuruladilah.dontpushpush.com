<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $sql = "SELECT COUNT(id) total, MONTH(tarikh) bulan, YEAR(tarikh) tahun FROM penilaian_latihan WHERE YEAR(tarikh) >= :tahunSebelum AND YEAR(tarikh) <= :tahunSehingga GROUP BY MONTH(tarikh), YEAR(tarikh) ORDER BY tahun,bulan";

        $penilaianLatihan = DB::select(DB::raw($sql), [
            'tahunSebelum' => $request->get('tahunsblm'),
            'tahunSehingga' => $request->get('tahunsehingga')
        ]);

        return $penilaianLatihan;
    }
}
