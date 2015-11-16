<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePesertaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('peserta', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nama');
            $table->integer('markah_penilaian_A');
            $table->integer('markah_penilaian_B');
            $table->integer('markah_penilaian_C');
            $table->integer('markah_pencapaian_A_sebelum');
            $table->integer('markah_pencapaian_B_sebelum');
            $table->integer('markah_pencapaian_C_sebelum');
            $table->integer('markah_pencapaian_A_selepas');
            $table->integer('markah_pencapaian_B_selepas');
            $table->integer('markah_pencapaian_C_selepas');
            $table->integer('penilaian_latihan_id')->unsigned();
            $table->timestamps();

            $table->foreign('penilaian_latihan_id')
                ->references('id')
                ->on('penilaian_latihan')
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
        Schema::drop('peserta');
    }
}
