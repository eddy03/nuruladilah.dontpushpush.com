<?php

use Illuminate\Database\Seeder;

class SoalanKompetensiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('soalan_kompetensi')->insert([[
            'soalan' => 'Sikap Positif',
            'penerangan' => 'Baik dalam perhubungan dan sentiasa berminat dalam mempelajari bidang baru sebagai satu tanggungjawab',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Semangat Berpasukan',
            'penerangan' => 'Bekerjasama di antara satu sama lain di dalam satu pasukan dengan memberi bantuan dan sokongan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Komunikasi (lisan)',
            'penerangan' => 'Berkebolehan menjelaskan idea dengan berkesan, memahami dan di fahami dalam proses pertukaran maklumat',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Komunikasi (tulisan)',
            'penerangan' => 'Kebolehan menjelaskan idea melalui tulisan dengan menggunakan bahasa dan terminologi yang sesuai dengan kriteria atau keperluan pembaca',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Kualiti Kerja',
            'penerangan' => 'Mencapai tahap kualiti kerja yang diperlukan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Kesedaran di dalam Khidmat Pelanggan',
            'penerangan' => 'Berupaya mengekalkan hubungan yang baik di antara pelanggan dalaman dan luaran',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Kemahiran Komputer',
            'penerangan' => 'Berpengetahuan dan berkebolehan menggunakan komputer dan di dalam tugasan dengan berkesan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Penyesuaian tugas',
            'penerangan' => 'Bertindak pantas dalam menangani kehendak tugasan tanpa mengabaikan kecekapan yang lain',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ], [
            'soalan' => 'Kemahiran Perorangan (Interpersonal Skill)',
            'penerangan' => 'Berupaya untuk menjalin dan mengekalkan hubungan kerja yang baik dengan rakan sekerja, pihak atasan dan pelanggan',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]
        ]);
    }
}
