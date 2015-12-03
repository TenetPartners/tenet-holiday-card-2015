module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src('./assets/**').pipe(gulp.dest('./build/assets/'))
    };
};