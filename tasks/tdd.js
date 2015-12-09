module.exports = (gulp, plugins, utilities)  => {
    return () => {
        utilities.exitAfterTest = false;
        return gulp.watch([
            utilities.paths.TEST_FILES,
            utilities.paths.JS_SRC
        ], ['eslint', 'test']).on('error', plugins.util.log);
    };
};
