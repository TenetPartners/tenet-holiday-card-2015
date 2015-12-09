import gulp from 'gulp';
import babel from 'babel-core/register'

let plugins = require('gulp-load-plugins')({ pattern: '*', rename: {
    'vinyl-buffer': 'buffer'
}});
plugins.utilities = require('./gulp-utilities');
plugins.source = require('vinyl-source-stream');
babel({presets: plugins.utilities.paths.BABEL_PRESETS});

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, plugins.utilities);
}

gulp.task('sass', getTask('sass'));
gulp.task('copy-assets', getTask('copy-assets'));
gulp.task('tdd', getTask('tdd'));
gulp.task('test', getTask('test'));
gulp.task('eslint', getTask('eslint'));
gulp.task('browser-sync', getTask('browser-sync'));
gulp.task('scripts', getTask('scripts'));
gulp.task('coverage:instrument', getTask('coverage:instrument'));
gulp.task('coverage:report', getTask('coverage:report'));
gulp.task('responsive-images', getTask('responsive-images'));
gulp.task('clean', getTask('clean'));
gulp.task('test:coverage', getTask('test:coverage'));
gulp.task('awspublish', getTask('awspublish'));
gulp.task('deploy', getTask('deploy'));

gulp.task('default', ['copy-assets', 'sass', 'eslint', 'scripts', 'browser-sync'], function () {
    gulp.watch(plugins.utilities.paths.JS_SRC, ['eslint', 'scripts']);
    gulp.watch('styles/**/*', ['sass']);
});
