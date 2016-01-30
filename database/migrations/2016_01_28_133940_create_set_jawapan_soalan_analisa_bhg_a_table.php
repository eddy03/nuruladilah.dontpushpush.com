<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSetJawapanSoalanAnalisaBhgATable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('set_jawapan_soalan_analisa_bhg_a', function (Blueprint $table) {
            $table->increments('id');
            $table->string('jawapan');
            $table->integer('soalan_analisa_bhg_a_id')->unsigned();
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
        Schema::drop('set_jawapan_soalan_analisa_bhg_a');
    }
}
