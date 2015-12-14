module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src('./coverage/**/lcov.info')
        .pipe(plugins.coveralls());
};
