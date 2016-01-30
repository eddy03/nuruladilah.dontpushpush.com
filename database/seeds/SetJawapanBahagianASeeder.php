<?php

use Illuminate\Database\Seeder;

class SetJawapanBahagianASeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('set_jawapan_soalan_analisa_bhg_a')->insert([[
            'jawapan' => 'Ya',
            'soalan_analisa_bhg_a_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Tidak',
            'soalan_analisa_bhg_a_id' => 1,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Seminar',
            'soalan_analisa_bhg_a_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Ceramah',
            'soalan_analisa_bhg_a_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Bengkel',
            'soalan_analisa_bhg_a_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Amali/Latih Amal',
            'soalan_analisa_bhg_a_id' => 2,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Ya',
            'soalan_analisa_bhg_a_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Tidak',
            'soalan_analisa_bhg_a_id' => 3,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Kurang 3 hari',
            'soalan_analisa_bhg_a_id' => 4,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'jawapan' => 'Lebih 3 hari',
            'soalan_analisa_bhg_a_id' => 4,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]
        ]);
    }
}
