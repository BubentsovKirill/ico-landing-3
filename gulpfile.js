'use strict';
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var del = require('del');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageminPngquant = require('imagemin-pngquant');

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(gulp.dest('tmp/'))
});

gulp.task('scss', function(){
  return gulp.src('app/scss/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(rename('style.css'))
  .pipe(gulp.dest('app/css/'))
});

gulp.task('js',function(){
  return gulp.src([
        'app/libs/bootstrap-sass/assets/javascripts/bootstrap.js',
        'app//libs/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
        'app/libs/jquery-countTo/jquery.countTo.js',
        'app/libs/simplelightbox/dist/simple-lightbox.js',

        'app/libs/slick-carousel/slick/slick.js',
        'app/js/index.js'
  ])
  .pipe(concat('js.min.js'))
  .pipe(gulp.dest('tmp/js'))
});

gulp.task('css',['scss'], function(){
  return gulp.src([
    'app/libs/font-awesome/css/font-awesome.css',
    'app/libs/simplelightbox/dist/simplelightbox.css',

    'app/libs/slick-carousel/slick/slick-theme.css',
    'app/css/style.css'])
  .pipe(sourcemaps.init())
  .pipe(concat('style.min.css'))
  .pipe(csso())
  .pipe(gulp.dest('tmp/css/'))
});

gulp.task('copy', function(){
  return gulp.src('app/font/**.*')
  .pipe(gulp.dest('tmp/fonts/'))
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({  
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [imageminPngquant()]
  })))
  .pipe(gulp.dest('dist/img')); // Выгружаем в продакшн
});

gulp.task('browser-sync',function(){
  browserSync({
    server: ["tmp", "app"],
    port: 8080,
    notify: false, 
    ui: {
      port: 8081
    }
    });
});

gulp.task('clear',function(){
  return del.sync('dist'); 
});

gulp.task('default',['browser-sync','html','scss','js'], function(){
  gulp.watch('app/*.html', ['html']);
  gulp.watch('tmp/*.html');
  gulp.watch('app/scss/*.scss', ['scss']);
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch('tmp/css/*.css');
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('tmp/js/*.js');
});

gulp.task('build',['clear','img','scss','js'],function(){
  gulp.src(['tmp/*.html'])
  .pipe(gulp.dest('dist'));
  gulp.src(['tmp/css/*.css'])
  .pipe(gulp.dest('dist/css'));
  gulp.src('tmp/fonts/**.*')
  .pipe(gulp.dest('dist/fonts'));
  gulp.src('tmp/js/*.js')
  .pipe(gulp.dest('dist/js'))
});