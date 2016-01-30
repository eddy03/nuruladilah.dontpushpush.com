<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnggotaAnalisaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anggota_analisa', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nama');
            $table->string('siri');
            $table->string('jawatan');
            $table->integer('bahagian_id')->unsigned();
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
        Schema::drop('anggota_analisa');
    }
}
