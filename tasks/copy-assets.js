module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(['./assets/**', './index.html']).pipe(gulp.dest('./build/assets/'))
};