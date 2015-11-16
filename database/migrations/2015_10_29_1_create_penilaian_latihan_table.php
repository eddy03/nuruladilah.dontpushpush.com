<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePenilaianLatihanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penilaian_latihan', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tajuk', 1000);
            $table->string('tempat');
            $table->string('penganjur');
            $table->integer('bilanganPeserta')->unsigned();
            $table->date('tarikh');
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
        Schema::drop('penilaian_latihan');
    }
}
