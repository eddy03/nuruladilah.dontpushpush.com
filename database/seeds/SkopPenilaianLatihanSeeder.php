<?php

use Illuminate\Database\Seeder;

class SkopPenilaianLatihanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('skop_penilaian_latihan')->insert([[
            'aspek' => 'Objektif latihan / kursus telah tercapai',
            'bahagian_penilaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Latihan / kursus dihadiri relevan dengan tugas harian',
            'bahagian_penilaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Isi kandungan latihan / kursus mencukupi, dikendalikan serta dibentangkan dengan jelas dan logik',
            'bahagian_penilaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Latihan / kursus ini merangkumi semua subjek didalam waktu yang dibenarkan',
            'bahagian_penilaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Latihan / kursus ini menepati jangkaan dan akan mengesyorkan kepada anggota lain',
            'bahagian_penilaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Fasilitator berpengetahuan luas dan berpengalaman di dalam subjek berkaitan',
            'bahagian_penilaian_latihan_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Kandungan bahan pengajaran amat berkesan dalam membantu dan mengilustrasi penyampaian fasilitator',
            'bahagian_penilaian_latihan_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Latihan / kursus memberi faedah kepada kerjaya dan organisasi',
            'bahagian_penilaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Meningkatkan pengetahuan / pemahaman berbanding sebelum ini',
            'bahagian_penilaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Akan mengaplikasikan apa yang dipelajari dalam menjalankan tugas',
            'bahagian_penilaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]]);
    }
}
