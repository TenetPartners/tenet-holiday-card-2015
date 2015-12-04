import gulp from 'gulp';
import babel from 'babel-core/register'

let configs = require('./gulp_tasks/configs');
var plugins = require('gulp-load-plugins')({
    pattern: '*'
});
babel({presets: configs.BABEL_PRESETS});
plugins.source = require('vinyl-source-stream');
plugins.buildScript = configs.buildScript;

function getTask(task) {
    return require('./gulp_tasks/' + task)(gulp, plugins, configs);
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
gulp.task('deploy:stage', getTask('deploy:stage'));

gulp.task('default', ['copy-assets', 'sass', 'eslint', 'scripts', 'browser-sync'], function () {
    gulp.watch(configs.SRC_FILES, ['eslint', 'scripts']);
    gulp.watch('styles/**/*', ['sass']);
});
