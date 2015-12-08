module.exports = (gulp, plugins, configs) => {
    return () => {
        return gulp.src(['./assets/**', './index.html']).pipe(gulp.dest('./build/assets/'))
    };
};