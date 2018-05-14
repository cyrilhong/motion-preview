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
    .pipe(gulp.dest('./docs/css/'))
    .pipe( livereload( server ));
});

gulp.task('jade', function() {
    return gulp.src('jade/**/*.jade')
    .pipe(jade()) // pip to jade plugin
    .pipe(gulp.dest('./docs/')) // tell gulp our output folder
    .pipe( livereload( server ));
});

gulp.task('image', function() {
    return gulp.src('docs/img/*')
    .pipe( livereload( server ));
});

gulp.src('./docs/*/*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./docs'));

gulp.task('watch', function () {
    livereload.listen();
    connect.server({
        root: ['./docs'],
        livereload: true,
        port: 7777,
    });
    server.listen(35728, function (err) {
        if (err) {
            return console.log(err);
        }
        gulp.watch('sass/**/*.scss',['styles']);
        gulp.watch('jade/*.jade',['jade']);
        gulp.watch('docs/img/**/*.'.src, ['images']);
    });
});

gulp.task('docs', function(){
  gulp.src('./docs/index.html').pipe(open({uri: 'http://localhost:7777', app: 'Google Chrome'}));
});

//Watch task
gulp.task('default', ['styles','image','jade','watch','docs']);
//Build
gulp.task('build', ['styles','image','jade']);
