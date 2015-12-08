module.exports = (gulp, plugins, configs) => {
    return () => {
        return gulp.src('./build/**/*', {read: false}).pipe(plugins.clean());
    };
};