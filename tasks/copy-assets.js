module.exports = (gulp, plugins, configs) => {
    return () => {
        return gulp.src('./assets/**').pipe(gulp.dest('./build/assets/'))
    };
};