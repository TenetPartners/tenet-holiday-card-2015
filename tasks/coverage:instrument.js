import { Instrumenter } from 'isparta'

module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(utilities.paths.JS_SRC)
        .pipe(plugins.istanbul({
            instrumenter: Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
            babel: {presets: utilities.paths.BABEL_PRESETS}
        }))
        .pipe(plugins.istanbul.hookRequire()); // Force `require` to return covered files
};