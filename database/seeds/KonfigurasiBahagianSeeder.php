<?php

use Illuminate\Database\Seeder;

class KonfigurasiBahagianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bahagian')->insert([[
            'nama' => 'Pejabat Ketua Pegawai Eksekutif',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Pentadbiran & Sumber Manusia',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Kewangan',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Pembangunan Perniagaan',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Hartanah',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Pengurusan Kualiti/Keselamatan & Kesihatan',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Teknikal',
            'aktif' => true,
            'bahagian_id' => 0,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Pengurusan Projek',
            'aktif' => true,
            'bahagian_id' => 7,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Kontrak & Ukur Bahan',
            'aktif' => true,
            'bahagian_id' => 7,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'nama' => 'Mekanikal',
            'aktif' => true,
            'bahagian_id' => 7,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]]);
    }
}
