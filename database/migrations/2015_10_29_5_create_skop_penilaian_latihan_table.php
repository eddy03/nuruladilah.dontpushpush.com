<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkopPenilaianLatihanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skop_penilaian_latihan', function (Blueprint $table) {
            $table->increments('id');
            $table->string('aspek');
            $table->integer('bahagian_penilaian_latihan_id')->unsigned();
            $table->timestamps();

            $table->foreign('bahagian_penilaian_latihan_id')
                ->references('id')
                ->on('bahagian_penilaian_latihan')
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
        Schema::drop('skop_penilaian_latihan');
    }
}
