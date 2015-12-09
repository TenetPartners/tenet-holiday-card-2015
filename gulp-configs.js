var notify = require('gulp-notify');

module.exports = {
    SRC_FILES: './scripts/**/*.js',
    BABEL_PRESETS: ["stage-0", "es2015", "react"],
    TEST_FILES: './scripts/**/__tests__/**/*.js',
    HTML_FILES: ['./**/*.html', '!./node_modules/**', '!./coverage/**', '!./assets/**', '!./build/**'],
    BUILD_FOLDER: './build',
    exitAfterTest: true,
    utils: {
        handleErrors: (error, gulpProc) => {
            gulpProc.emit('end');
            return notify.onError({
                title: 'Compile Error',
                message: "\n" + error.formatted
            }).apply(this, arguments);
        },
        buildScript: (file, watch, plugins, gulp) => {
            var props = {
                entries: ['./scripts/' + file],
                debug: true,
                transform: [plugins.babelify.configure({presets: plugins.configs.BABEL_PRESETS})]
            };
            var bundler = watch ? plugins.watchify(plugins.browserify(props)) : plugins.browserify(props);

            function rebundle() {
                var stream = bundler.bundle();
                return stream
                    .on('error', function(e){plugins.configs.utils.handleErrors(e, this)})
                    .pipe(plugins.source(file))
                    .pipe(gulp.dest(plugins.configs.BUILD_FOLDER))
                    .pipe(plugins.browserSync.reload({stream: true}))
            }
            // listen for an update and run rebundle
            bundler.on('update', function () {
                rebundle();
                gutil.log('Rebundle...');
            });
            return rebundle();
        }
    }
};
