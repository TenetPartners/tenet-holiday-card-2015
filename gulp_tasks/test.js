module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src(configs.TEST_FILES, {read: false})
            .pipe(plugins.mocha({
                compilers: {js: plugins.babel},
                require: ['./lib/jsdom'] // Prepare environement for React/JSX testing
            }));
    }
};