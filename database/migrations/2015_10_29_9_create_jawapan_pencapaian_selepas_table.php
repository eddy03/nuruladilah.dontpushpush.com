<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJawapanPencapaianSelepasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jawapan_pencapaian_selepas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('jawapan');
            $table->integer('peserta_id')->unsigned();
            $table->integer('skop_pencapaian_latihan_id')->unsigned();
            $table->integer('jawapan_pencapaian_sebelum_id')->unsigned();
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
        Schema::drop('jawapan_pencapaian_selepas');
    }
}
