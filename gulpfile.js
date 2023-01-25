const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

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
}

gulp.task('watch', watch)
gulp.task('default', gulp.parallel('watch', 'browser-sync'))