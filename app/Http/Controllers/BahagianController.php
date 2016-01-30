<?php

namespace App\Http\Controllers;

use App\Bahagian;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Validator;

class BahagianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bahagian = Bahagian::all();

        foreach($bahagian as $key=>$bhg) {
            if($bhg->bahagian_id != 0) {
                $bahagian[$key]->parent = Bahagian::where('id', $bhg->bahagian_id)->first(['nama']);
            }
        }

        return $bahagian;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|unique:bahagian,nama|max:255'
        ], [
            'nama.required' => 'Nama bahagian adalah diperlukan',
            'nama.unique' => 'Nama bahagian pernah didaftarkan didalam sistem',
            'nama.max' => 'Nama bahagian tidak boleh panjang daripada 255 aksara'
        ]);

        if($validator->fails()) {
            return [
                'success' => false,
                'message' => $validator->errors(),
                'populate' => $request->all()
            ];
        } else {

            $bahagian = new Bahagian();

            $bahagian->nama = $request->get('nama');
            $bahagian->aktif = 1;
            if($request->has('bahagian_id') && !$request->get('induk')) {
                $bahagian->bahagian_id = $request->get('bahagian_id');
            }

            $bahagian->save();

            return ['success' => true];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|unique:bahagian,nama|max:255'
        ], [
            'nama.required' => 'Nama bahagian adalah diperlukan',
            'nama.unique' => 'Nama bahagian pernah didaftarkan didalam sistem',
            'nama.max' => 'Nama bahagian tidak boleh panjang daripada 255 aksara'
        ]);

        if($validator->fails()) {
            return [
                'success' => false,
                'message' => $validator->errors(),
                'populate' => $request->all()
            ];
        } else {

            $bahagian = Bahagian::findOrFail($id);

            $bahagian->nama = $request->get('nama');
            $bahagian->aktif = 1;
            if($request->has('bahagian_id') && !$request->get('induk')) {
                $bahagian->bahagian_id = $request->get('bahagian_id');
            }

            $bahagian->save();

            return ['success' => true];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bahagian = Bahagian::find($id);

        $bahagian->delete();

        return [ 'success' => true ];
    }
}
