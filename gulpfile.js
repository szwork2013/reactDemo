var browserify = require('browserify');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require("vinyl-source-stream");
var symlink = require('gulp-symlink');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

gulp.task("less", function () {
    gulp.src(["static/less/*.less"])
        .pipe(plumber())
        .pipe(less())
        //.pipe(rename("style.css"))
        //.pipe(gulp.dest('dist/css'))
        //.pipe(minifyCSS())
        //.pipe(rename("style.min.css"))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browserify', function () {
    browserify("./app/components/App.js")
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task("concatCss", ["less"], function () {
    gulp.src(["dist/css/default.css", "dist/css/test.css"])
        .pipe(concat("main.css"))
        //.pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("build", ["concatCss", "browserify"]);