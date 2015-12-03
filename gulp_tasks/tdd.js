module.exports = (gulp, plugins, configs)  => {
    return () => {
        gulp.watch(configs.SRC_FILES, ['eslint']);
        gulp.watch([
            configs.TEST_FILES,
            configs.SRC_FILES
        ], ['test']).on('error', plugins.gutil.log);
    };
};