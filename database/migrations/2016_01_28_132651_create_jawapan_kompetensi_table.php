<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJawapanKompetensiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jawapan_kompetensi', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('jawapan')->default(0);
            $table->integer('jenis_penilaian');
            $table->boolean('diri_sendiri')->default(true);
            $table->integer('anggota_analisa_id')->unsigned();
            $table->integer('soalan_kompetensi_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('jawapan_kompetensi');
    }
}
