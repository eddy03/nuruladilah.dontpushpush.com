<?php

Route::get('/', ['as' => 'homepage', 'uses' => 'MainController@homepage']);

Route::post('auth', ['as' => 'authentication', 'uses' => 'MainController@authenticate']);

Route::group(['middleware' => 'auth'], function() {

    Route::get('dashboard', ['as' => 'dashboard', 'uses' => 'DashboardController@dashboard']);

    Route::resource('penilaian', 'PenilaianLatihanController');

    Route::resource('jawapan', 'JawapanPenilaianController');

    Route::post('changepassword', ['as' => 'changepassword', 'uses' => 'MainController@changepassword']);

    Route::get('logout', ['as' => 'logout', 'uses' => 'MainController@logout']);

});
