var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var elixir = require('laravel-elixir');

var Task = elixir.Task;

elixir.extend('html', function(message) {

    new Task('html', function() {
        return gulp.src('./resources/html/**/*')
            .pipe(minifyHTML({}))
            .pipe(gulp.dest('./public/html/'));
    })
        .watch('./resources/html/**/*');

});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir(function(mix) {
    mix .less('public.less')
        .less('app.less')
        .scripts([
            'lib/angular.min.js',
            'lib/jquery.min.js',
            'lib/angular-route.min.js',
            'lib/angular-resource.min.js',
            'lib/ui-bootstrap.min.js',
            'lib/ui-bootstrap-tpls.min.js',
            'lib/bootstrap.min.js',
            'lib/lodash.min.js',
            'lib/highcharts.js',
            'lib/highcharts-3d.js',
            'App.js',
            'models',
            'controllers'
        ], 'public/js/app.js')
        .version(['css/public.css', 'css/app.css', 'js/app.js'])
        .html();
});
