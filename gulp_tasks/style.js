import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import utils from './utils'
let handleErrors = utils.handleErrors;
import browserSync from 'browser-sync'
let reload = browserSync.reload;

/*
 Styles Task
 */
gulp.task('styles', () => {
    gulp.src('./styles/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
        .on('error', handleErrors)
        .pipe(gulp.dest('./build/'))
        .pipe(reload({stream:true}))
});