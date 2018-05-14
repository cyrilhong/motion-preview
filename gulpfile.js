var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var livereload  = require('gulp-livereload');
var connect      = require('gulp-connect');
var open = require('gulp-open');
var tinylr      = require('tiny-lr');
var server      = tinylr();
var cachebust = require('gulp-cache-bust');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css/'))
    .pipe( livereload( server ));
});

gulp.task('jade', function() {
    return gulp.src('jade/**/*.jade')
    .pipe(jade()) // pip to jade plugin
    .pipe(gulp.dest('./app/')) // tell gulp our output folder
    .pipe( livereload( server ));
});

gulp.task('image', function() {
    return gulp.src('app/img/*')
    .pipe( livereload( server ));
});

gulp.src('./app/*/*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./app'));

gulp.task('watch', function () {
    livereload.listen();
    connect.server({
        root: ['./app'],
        livereload: true,
        port: 7777,
    });
    server.listen(35728, function (err) {
        if (err) {
            return console.log(err);
        }
        gulp.watch('sass/**/*.scss',['styles']);
        gulp.watch('jade/*.jade',['jade']);
        gulp.watch('app/img/**/*.'.src, ['images']);
    });
});

gulp.task('app', function(){
  gulp.src('./app/index.html').pipe(open({uri: 'http://localhost:7777', app: 'Google Chrome'}));
});

//Watch task
gulp.task('default', ['styles','image','jade','watch','app']);
//Build
gulp.task('build', ['styles','image','jade']);
