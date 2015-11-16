<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJawapanPenilaianPesertaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jawapan_penilaian_peserta', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('jawapan');
            $table->integer('peserta_id')->unsigned();
            $table->integer('skop_penilaian_latihan_id')->unsigned();
            $table->timestamps();

            $table->foreign('peserta_id')
                ->references('id')
                ->on('peserta')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('jawapan_penilaian_peserta');
    }
}
