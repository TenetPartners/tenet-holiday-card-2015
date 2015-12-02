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
gulp.task('test', () => {
    return gulp.src(TEST_FILES, {read: false})
        .pipe(mocha({
            compilers: { js: babel },
            require: ['./lib/jsdom'] // Prepare environement for React/JSX testing
        }));
});

/**
 * Run unit tests with code coverage
 */
gulp.task('test:coverage', (done) => {
    runSequence('coverage:instrument', 'test', 'coverage:report', done);
});

/**
 * Watch files and run unit tests on changes
 */
gulp.task('tdd', (done) => {
    gulp.watch([
        TEST_FILES,
        SRC_FILES
    ], ['test']).on('error', gutil.log);
});