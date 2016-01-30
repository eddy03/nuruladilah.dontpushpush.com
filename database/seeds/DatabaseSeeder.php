<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //Prevent seeding already seed data in production.
//        $this->call(UserTableSeeder::class);
//        $this->call(BahagianPencapaianLatihanSeeder::class);
//        $this->call(BahagianPenilaianLatihanSeeder::class);
//        $this->call(SkopPencapaianLatihanSeeder::class);
//        $this->call(SkopPenilaianLatihanSeeder::class);
        $this->call(KonfigurasiBahagianSeeder::class);
        $this->call(SoalanKompetensiSeeder::class);
        $this->call(BahagianBahagianBSeeder::class);
        $this->call(KursusBahagianBSeeder::class);
        $this->call(SetJawapanBahagianASeeder::class);
        $this->call(SoalanBahagianASeeder::class);

        Model::reguard();
    }
}
