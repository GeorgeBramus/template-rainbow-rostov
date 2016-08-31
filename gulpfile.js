var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  coffeescript = require('gulp-coffee'),
  notify = require('gulp-notify'),
  sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css'),
  prefix = require('gulp-autoprefixer'),
  promise = require('gulp-promise'),
  uglify = require('gulp-uglify'),
  wiredep = require('wiredep').stream;

// sass
gulp.task('sass',function(){
  gulp.src('src/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'));
})

// css
gulp.task('css', ['sass'], function(){
  setTimeout(function(){
    gulp.src('src/css/*.css')
      .pipe(concat('main.max.css'))
      .pipe(prefix({
            browsers: ['last 3 versions'],
            cascade: false
        }))
      .pipe(gulp.dest('src/css/prefix'))
      .pipe(minifyCSS())
      .pipe(rename('main.min.css'))
      // .pipe(gulp.dest('/tmp/fz3temp-1'))
      .pipe(gulp.dest('app/css'))
      .pipe(notify('SASSS & CSS Done!'));
  },1000)
});

// coffee
gulp.task('coffee',function(){
  gulp.src('src/js/coffee/*.coffee')
    .pipe(coffeescript())
    .pipe(gulp.dest('src/js/coffee/js'));
});

// js
gulp.task('js', ['coffee'], function(){
  setTimeout(function(){
    gulp.src('src/js/coffee/js/*.js')
      .pipe(concat('main.max.js'))
      .pipe(gulp.dest('src/js'))
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      // .pipe(gulp.dest('/tmp/fz3temp-1'))
      .pipe(gulp.dest('app/js'))
      .pipe(notify('JS Done!'));
  },1000)
});

// bower
gulp.task('bower', function () {
  gulp.src('./wiredep.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./'));
});

// watch
gulp.task('watch', function(){
  gulp.watch('src/sass/*.sass',['css']);
  gulp.watch('src/js/coffee/*.coffee',['js']);
});

// default
gulp.task('default',['css','js']);