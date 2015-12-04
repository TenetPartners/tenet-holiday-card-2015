module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src(configs.SRC_FILES, {read: false})
            .pipe(plugins.istanbul.writeReports())
            .once('end', function () {
                process.exit();
            });
    };
};