import gulp from 'gulp';
import babel from 'babel-core/register'

let configs = require('./gulp_tasks/configs');
var plugins = require('gulp-load-plugins')({
    pattern: '*'
});
babel({presets: configs.BABEL_PRESETS});
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
            .pipe(plugins.browserSync.reload({stream: true}))
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
gulp.task('coverage:instrument', getTask('coverage:instrument'));
gulp.task('coverage:report', getTask('coverage:report'));
gulp.task('responsive-images', getTask('responsive-images'));
gulp.task('test:coverage', getTask('test:coverage'));
gulp.task('clean', getTask('clean'));

gulp.task('deploy:stage', ['copy-assets', 'sass', 'eslint', 'scripts']);
gulp.task('default', ['copy-assets', 'sass', 'eslint', 'scripts', 'browser-sync'], function () {
    gulp.watch(configs.SRC_FILES, ['scripts']);
    gulp.watch('styles/**/*', ['sass']);
});