import gulp from 'gulp'
/*
 Copy over assets
 */
gulp.task('assets', () => {
    gulp.src('./assets/**')
        .pipe(gulp.dest('./build/assets/'))
});