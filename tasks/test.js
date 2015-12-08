module.exports = (gulp, plugins, configs) => {
    return () => {
        return gulp.src(configs.TEST_FILES, {read: false})
            .pipe(plugins.mocha({
                compilers: {js: plugins.babel},
                require: ['./lib/jsdom'] // Prepare environement for React/JSX testing
            })).once('end', function () {
                if(configs.exitAfterTest) process.exit();
            });
    }
};