module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src('./build/**/*', {read: false}).pipe(plugins.clean());
};