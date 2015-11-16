<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group([], function() {

    Route::get('/', ['as' => 'homepage', 'uses' => 'MainController@homepage']);

    Route::post('auth', ['as' => 'authentication', 'uses' => 'MainController@authenticate']);

    Route::post('changepassword', ['as' => 'changepassword', 'uses' => 'MainController@changepassword']);

    Route::get('logout', ['as' => 'logout', 'uses' => 'MainController@logout']);

});

Route::group(['middleware' => 'auth'], function() {

    Route::resource('penilaian', 'PenilaianLatihanController');

    Route::resource('jawapan', 'JawapanPenilaianController');

});
