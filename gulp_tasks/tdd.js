module.exports = (gulp, plugins, configs)  => {
    return () => {
        gulp.watch([
            configs.TEST_FILES,
            configs.SRC_FILES
        ], ['eslint', 'test']).on('error', plugins.util.log);
    };
};