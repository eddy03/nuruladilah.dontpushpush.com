<?php

use Illuminate\Database\Seeder;

class SoalanBahagianASeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('soalan_analisa_bhg_a')->insert([[
            'soalan' => 'Pada pendapat anda, adakah organisasi anda menyediakan peluang untuk meningkatkan pengetahuan dan kemahiran anda dalam bidang utama kerja?',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Pada pendapat anda, apakah metodologi/kaedah latihan yang lebih berkesan untuk meningkatkan kualiti kerja anda?',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Bolehkah kursus/latihan yang disediakan dan dihadiri membantu meningkatkan kecekapan kerja/tugasan anda?',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Secara amnya, berapa lamakah anda sanggup menghadiri sesuatu kursus/latihan?',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]
        ]);
    }
}
