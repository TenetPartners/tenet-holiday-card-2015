module.exports = {
    SRC_FILES: './scripts/**/*.js',
    BABEL_PRESETS: ["stage-0", "es2015", "react"],
    TEST_FILES: './scripts/**/__tests__/**/*.js',
    exitAfterTest: true,
    handleErrors: () => {
        var args = Array.prototype.slice.call(arguments);
        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);
        this.emit('end'); // Keep gulp from hanging on this task
    },
    buildScript: (file, watch, plugins, configs, gulp) => {
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
    }
};