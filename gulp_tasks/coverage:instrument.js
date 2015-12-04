import { Instrumenter } from 'isparta'
module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src(configs.SRC_FILES)
            .pipe(plugins.istanbul({
                instrumenter: Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
                babel: {presets: configs.BABEL_PRESETS}
                // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulopt)
                // ...
            }))
            .pipe(plugins.istanbul.hookRequire()); // Force `require` to return covered files
    };
};