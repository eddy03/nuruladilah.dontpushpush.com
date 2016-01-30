<?php

Route::get('/', ['as' => 'homepage', 'uses' => 'MainController@homepage']);

Route::post('auth', ['as' => 'authentication', 'uses' => 'MainController@authenticate']);

Route::group(['middleware' => 'auth'], function() {

    Route::post('changepassword', ['as' => 'changepassword', 'uses' => 'MainController@changepassword']);

    Route::get('logout', ['as' => 'logout', 'uses' => 'MainController@logout']);

    Route::group(['prefix' => 'API'], function() {

       Route::group(['prefix' => 'v1'], function() {

           Route::get('dashboard', ['as' => 'dashboard', 'uses' => 'DashboardController@dashboard']);

           Route::group(['prefix' => 'konfigurasi'], function() {

               Route::resource('bahagian', 'BahagianController');

           });

           Route::group(['prefix' => 'latihan'], function() {

               Route::group(['prefix' => 'penilaian'], function() {

                   Route::resource('penilaian', 'PenilaianLatihanController');

                   Route::resource('jawapan', 'JawapanPenilaianController');

               });

               Route::group(['prefix' => 'analisa'], function() {

                   Route::get('soalan', 'AnalisaController@soalan');

                   Route::resource('analisa', 'AnalisaController');

               });

           });

       });

    });
});
