var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./scss/**/*.scss']
};

function buildSass() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass({ loadPaths: [process.cwd()] }).on('error', sass.logError))
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
}

function watchSass() {
  gulp.watch(paths.sass, buildSass);
}

gulp.task('sass', buildSass);
gulp.task('watch', gulp.series(buildSass, watchSass));
gulp.task('default', buildSass);
