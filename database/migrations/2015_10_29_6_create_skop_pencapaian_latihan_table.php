<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkopPencapaianLatihanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skop_pencapaian_latihan', function (Blueprint $table) {
            $table->increments('id');
            $table->string('aspek');
            $table->integer('bahagian_pencapaian_latihan_id')->unsigned();
            $table->timestamps();

            $table->foreign('bahagian_pencapaian_latihan_id')
                ->references('id')
                ->on('bahagian_pencapaian_latihan')
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
        Schema::drop('skop_pencapaian_latihan');
    }
}
