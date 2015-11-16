<?php

use Illuminate\Database\Seeder;

class SkopPencapaianLatihanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('skop_pencapaian_latihan')->insert([[
            'aspek' => 'Tahap pengetahuan dan kualiti penghasilan kerja',
            'bahagian_pencapaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Keupayaan memberi pandangan relevan dan bernas',
            'bahagian_pencapaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Keupayaan menjadi sumber rujukan dalam bidang berkaitan',
            'bahagian_pencapaian_latihan_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Keupayaan dan kecekapan dalam menjalankan tugas',
            'bahagian_pencapaian_latihan_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Keupayaan menggunakan kreativiti dalam penghasilan tugas',
            'bahagian_pencapaian_latihan_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Pro Aktif',
            'bahagian_pencapaian_latihan_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Tahap keyakinan dan komitmen dalam menjalankan tugas',
            'bahagian_pencapaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Sikap positif dan keterbukaan menerima teguran',
            'bahagian_pencapaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Kesediaan untuk memikul tanggungjawab',
            'bahagian_pencapaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'aspek' => 'Ketahanan mental dalam keadaan mendesak',
            'bahagian_pencapaian_latihan_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]]);
    }
}
