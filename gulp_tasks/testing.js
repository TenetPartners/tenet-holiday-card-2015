import gulp from 'gulp'
import mocha from 'gulp-mocha'
const TEST_FILES = 'scripts/**/__tests__/**/*.js';
import babelify from 'babelify'
import babel from 'babel-core/register'
import gutil from 'gulp-util'
const BABEL_PRESETS = ["stage-0", "es2015", "react"];
babel({ presets: BABEL_PRESETS })
const SRC_FILES = 'scripts/**/*.js';

/**
 * Run unit tests
 */


/**
 * Run unit tests with code coverage
 */
gulp.task('test:coverage', (done) => {
    runSequence('coverage:instrument', 'test', 'coverage:report', done);
});

/**
 * Watch files and run unit tests on changes
 */
