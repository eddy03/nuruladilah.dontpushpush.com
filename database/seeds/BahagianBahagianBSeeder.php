<?php

use Illuminate\Database\Seeder;

class BahagianBahagianBSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('analisa_bahagian_bahagian_b')->insert([[
            'bahagian' => 'Pengurusan dan profesional',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Kemahiran pentadbiran/pengurusan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Kewangan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Kursus pembangunan modal insan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Kursus pengetahuan dan kemahiran kerja',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Kursus teknikal',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'bahagian' => 'Kursus ICT',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]
        ]);
    }
}
