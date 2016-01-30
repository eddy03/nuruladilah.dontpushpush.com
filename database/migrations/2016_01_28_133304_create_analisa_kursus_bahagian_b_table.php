<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnalisaKursusBahagianBTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('analisa_kursus_bahagian_b', function (Blueprint $table) {
            $table->increments('id');
            $table->string('kursus');
            $table->integer('analisa_bahagian_bahagian_b_id')->unsigned();
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
        Schema::drop('analisa_kursus_bahagian_b');
    }
}
