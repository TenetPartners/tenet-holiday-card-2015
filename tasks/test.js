module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(utilities.paths.TEST_FILES, {read: false})
        .pipe(plugins.mocha({
            compilers: {js: plugins.babel},
            require: ['./lib/jsdom'] // Prepare environement for React/JSX testing
        })).once('end', function () {
            if (utilities.exitAfterTest) process.exit();
        });
};