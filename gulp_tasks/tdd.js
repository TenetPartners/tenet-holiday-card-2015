module.exports = (gulp, plugins, configs)  => {
    return () => {
        configs.isTdd = true;
        gulp.watch([
            configs.TEST_FILES,
            configs.SRC_FILES
        ], ['eslint', 'test']).on('error', plugins.util.log);
    };
};
