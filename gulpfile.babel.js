import gulp from 'gulp';
import browserSync from 'browser-sync'
import gutil from 'gulp-util'
import babel from 'babel-core/register'

let configs = require('./gulp_tasks/configs');
var plugins = require('gulp-load-plugins')();
babel({presets: configs.BABEL_PRESETS});
plugins.browserSync = browserSync;
plugins.reload = browserSync.reload;
plugins.gutil = gutil;
plugins.babel = babel;
plugins.babelify = require('babelify');
plugins.browserify = require('browserify');
plugins.source = require('vinyl-source-stream');
plugins.buildScript = (file, watch, plugins) => {
    var props = {
        entries: ['./scripts/' + file],
        debug: true,
        transform: [plugins.babelify.configure({presets: configs.BABEL_PRESETS})]
    };
    var bundler = watch ? plugins.watchify(plugins.browserify(props)) : plugins.browserify(props);
    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', configs.handleErrors)
            .pipe(plugins.source(file))
            .pipe(gulp.dest('./build/'))
            // .pipe(buffer())
            // .pipe(uglify())
            // .pipe(rename('app.min.js'))
            // .pipe(gulp.dest('./build'))
            .pipe(plugins.reload({stream: true}))
    }
    // listen for an update and run rebundle
    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
};

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
gulp.task('coverage:instruments', getTask('coverage:instruments'));
gulp.task('coverage:report', getTask('coverage:report'));

gulp.task('default', ['copy-assets', 'sass', 'eslint', 'scripts', 'browser-sync'], function () {
    gulp.watch(configs.SRC_FILES, ['scripts']);
    gulp.watch('styles/**/*', ['sass']);
});