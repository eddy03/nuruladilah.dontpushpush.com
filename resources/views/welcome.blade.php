@extends('layout.login')

@section('content')
    @if(Session::has('errors'))
        <div class="alert alert-danger">
            <i class="fa fa-warning fa-fw"></i> {{ Session::get('errors') }}
        </div>
    @endif
    <div class="login-box-body">
        <p class="login-box-msg">Sila log masuk terlebih dahulu</p>
        <form action="{{ route('authentication') }}" method="post">
            {!! csrf_field() !!}
            <div class="form-group has-feedback">
                <input type="text" name="username" class="form-control" required placeholder="Nama">
                <span class="fa fa-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" name="password" class="form-control" required placeholder="Kata laluan">
                <span class="fa fa-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-7">
                    <div class="checkbox icheck">
                        <label>
                            <input type="checkbox"> Ingati saya
                        </label>
                    </div>
                </div><!-- /.col -->
                <div class="col-xs-5">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">
                        <i class="fa fa-sign-in fa-fw"></i> Log Masuk
                    </button>
                </div><!-- /.col -->
            </div>
        </form>

        <a href="#">Terlupa kata laluan</a><br>

    </div><!-- /.login-box-body -->
@endsection