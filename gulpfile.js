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
    mix .less('app.less')
        .scripts([
            'lib/angular.min.js',
            'lib/jquery.min.js',
            'lib/angular-route.min.js',
            'lib/angular-resource.min.js',
            'lib/angular-block-ui.min.js',
            'lib/ui-bootstrap.min.js',
            'lib/ui-bootstrap-tpls.js',
            'lib/bootstrap.min.js',
            'lib/lodash.min.js',
            'lib/highcharts.js',
            'lib/highcharts-3d.js',
            'lib/exporting.js',
            'lib/icheck.min.js',
            'lib/moment.js',
            'lib/fullcalendar.min.js',
            'lib/Chart.min.js',
            'lib/angular-chart.min.js',
            'lib/app.min.js',
            'App.js',
            'models',
            'controllers'
        ], 'public/js/app.js')
        .version(['css/app.css', 'js/app.js'])
        .html();
});
