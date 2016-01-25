@extends('layout.login')

@section('content')
    @if(Session::has('errors'))
        <div class="alert alert-danger">
            <i class="fa fa-warning fa-fw"></i> {{ Session::get('errors') }}
        </div>
    @endif
    <div class="login-box-body">
        <p class="login-box-msg">Tukar kata laluan untuk pertama kali</p>
        <form action="{{ route('changepassword') }}" method="post">
            {!! csrf_field() !!}
            <div class="form-group has-feedback">
                <input type="password" name="password" class="form-control" required placeholder="Kata laluan">
                <span class="fa fa-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-offset-7 col-xs-5">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">
                        <i class="fa fa-check fa-fw"></i> Tukar
                    </button>
                </div><!-- /.col -->
            </div>
        </form>
    </div><!-- /.login-box-body -->
@endsection