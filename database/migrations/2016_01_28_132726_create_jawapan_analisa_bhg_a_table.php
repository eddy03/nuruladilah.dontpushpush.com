<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJawapanAnalisaBhgATable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jawapan_analisa_bhg_a', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('jawapan')->default(0);
            $table->integer('anggota_analisa_id')->unsigned();
            $table->integer('soalan_analisa_bhg_a_id')->nullable()->unsigned();
            $table->integer('set_jawapan_soalan_analisa_bhg_a_id')->nullable()->unsigned();
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
        Schema::drop('jawapan_analisa_bhg_a');
    }
}
