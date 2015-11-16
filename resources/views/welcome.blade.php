<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="dylurp system">
    <meta name="author" content="eddy<eddytech03@gmail.com>">

    <title>dontpushpush dylurp</title>

    <link href="{{ elixir('css/public.css') }}" rel="stylesheet" />

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<div class="site-wrapper">

    <div class="site-wrapper-inner">

        <div class="cover-container">

            <div class="masthead clearfix">
                <div class="inner">
                    <h3 class="masthead-brand">Dylurp</h3>
                    <nav>
                        <ul class="nav masthead-nav">
                            <li class="active"><a href="#">Log In</a></li>
                            <li><a href="http://dontpushpush.com">dontpushpush.com</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="inner cover">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3">
                        @if(Session::has('errors'))
                        <div class="alert alert-danger">
                            <i class="fa fa-warning fa-fw"></i> {{ Session::get('errors') }}
                        </div>
                        @endif
                        <form action="auth" method="POST">
                            {!! csrf_field() !!}
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-user fa-fw"></i>
                                    </span>
                                    <input type="text" class="form-control" name="username" placeholder="Username" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-lock fa-fw"></i>
                                    </span>
                                    <input type="password" class="form-control" name="password" placeholder="Password" required />
                                </div>
                            </div>
                            <div class="form-group text-right">
                                <button class="btn btn-default">
                                    <i class="fa fa-sign-in fa-fw"></i> Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="mastfoot">
                <div class="inner">
                    <p>Develop by <a href="http://dontpushpush.com">dontpushpush.com</a></p>
                </div>
            </div>

        </div>

    </div>

</div>

<script src="{{ elixir('js/app.js') }}"></script>
</body>
</html>
