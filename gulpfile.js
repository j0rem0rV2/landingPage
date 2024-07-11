const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'));
}

function plumberPrevent() {
    return gulp.src('./src/styles/*.scss') 
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css')); 
}

function optimizeImages() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function watchFiles() {
    gulp.watch('./src/styles/**/*.scss', plumberPrevent);
}

exports.default = gulp.parallel(styles, optimizeImages, watchFiles, plumberPrevent);