<?php

use Illuminate\Database\Seeder;

class BahagianPenilaianLatihanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bahagian_penilaian_latihan')->insert([[
            'bahagian' => 'Penilaian Latihan / Kursus',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Penilaian Fasilitator / Bahan Visual',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Penilaian keberkesanan latihan / kursus',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]]);
    }
}
