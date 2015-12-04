module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src('./build/**/*', {read: false})
            .pipe(plugins.clean());
    };
};