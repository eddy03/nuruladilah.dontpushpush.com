<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

use App\User;

class MainController extends Controller
{
    public function homepage()
    {
        if(Auth::check()) {

            if(Auth::user()->change_password) {
                return view('changepassword');
            } else {
                return view('app');
            }

        } else {
            return view('welcome');
        }
    }

    public function authenticate(Request $request)
    {
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            return redirect()->intended('/');
        } else {
            return redirect('/')->with('errors', 'Nama pengguna atau kata laluan tidak tepat');
        }
    }

    public function changepassword(Request $request)
    {
        $user = User::find(Auth::user()->id);
        $user->password = bcrypt($request->password);
        $user->change_password = 0;
        $user->save();

        return redirect('/');
    }

    public function logout()
    {
        Auth::logout();

        return redirect('/');
    }
}
