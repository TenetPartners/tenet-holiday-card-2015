import gulp from 'gulp'
import responsive from 'gulp-responsive-images';
import browserSync from 'browser-sync'
let reload = browserSync.reload;

gulp.task('responsive_images', () => {
    return gulp.src('assets/images/**/2x/*.{png,jpg,gif}')
        .pipe(responsive({
            '**/*.png': [{
                width: '50%'
            }]
        }))
        .pipe(gulp.dest('build/assets/images/'));
});