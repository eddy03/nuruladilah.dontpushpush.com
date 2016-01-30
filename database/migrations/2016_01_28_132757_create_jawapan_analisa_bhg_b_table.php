<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJawapanAnalisaBhgBTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jawapan_analisa_bhg_b', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('jawapan')->default(0);
            $table->string('cadangan')->nullable();
            $table->integer('anggota_analisa_id')->unsigned();
            $table->integer('analisa_kursus_bahagian_b_id')->unsigned();
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
        Schema::drop('jawapan_analisa_bhg_b');
    }
}
