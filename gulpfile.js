const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
// Compiling Sass, adding autoprefixer and refreshing the page
function compilaSass() {
  return gulp.src('scss/*.scss')
  .pipe(sass({ outputStyle: 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

function gulpJs() {
  return gulp.src('js/scripts/*.js')
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('js/'))
}
gulp.task('alljs', gulpJs);


function browser(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}
gulp.task('browser-sync', browser)

function watch(){
  gulp.watch('scss/*.scss', compilaSass);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/scripts/*js', gulpJs)
}

gulp.task('watch', watch)
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs'))