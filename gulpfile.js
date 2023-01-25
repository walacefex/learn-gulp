const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

function compilaSass() {
  return gulp.src('scss/*.scss')
  .pipe(sass({ outputStyle: 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'));
}

gulp.task('sass', compilaSass);

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
}

gulp.task('default', watch)