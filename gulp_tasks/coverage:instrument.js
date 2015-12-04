import { Instrumenter } from 'isparta'
module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src(configs.SRC_FILES)
            .pipe(plugins.istanbul({
                instrumenter: Instrumenter, // Use the isparta instrumenter (code coverage for ES6)c
                babel: {presets: configs.BABEL_PRESETS}
            }))
            .pipe(plugins.istanbul.hookRequire()); // Force `require` to return covered files
    };
};