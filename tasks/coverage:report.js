module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(utilities.paths.JS_SRC, {read: false})
        .pipe(plugins.istanbul.writeReports())
        .once('end', function () {
            process.exit();
        });
};