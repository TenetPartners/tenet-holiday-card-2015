module.exports = {
    args: require('yargs').argv,
    exitAfterTest: true,
    deployTarget: { // these should be aws s3 bucket names, called via gulp deploy --target={key}
        dev: "holiday2015.tenetpartners.com",
        prod: ""
    },
    paths: {
        JS_SRC: './scripts/**/*.js',
        BABEL_PRESETS: ["stage-0", "es2015", "react"],
        TEST_FILES: './scripts/**/__tests__/**/*.js',
        browserifyMainJs: "main.js"
    },
    helpers: {
        handleErrors: (error, gulpProc) => {
            gulpProc.emit('end');
            return require('gulp-notify').onError({
                title: 'Compile Error',
                message: "\n" + error.message
            })
        },
        buildScript: (file, watch, plugins, gulp) => {
            var props = {
                entries: ['./scripts/' + file],
                debug: true,
                transform: [plugins.babelify.configure({presets: plugins.utilities.paths.BABEL_PRESETS})]
            };
            var bundler = watch ? plugins.watchify(plugins.browserify(props)) : plugins.browserify(props);

            function rebundle() {
                var stream = bundler.bundle();
                if (plugins.utilities.args._[0] == 'deploy')
                    return stream
                        .on('error', function (e) {
                            plugins.configs.utils.handleErrors(e, this)
                        })
                        .pipe(plugins.source(file))
                        .pipe(plugins.buffer())
                        .pipe(plugins.uglify())
                        .pipe(gulp.dest('./build/'))
                        .pipe(plugins.browserSync.reload({stream: true}));
                else
                    return stream
                        .on('error', function (e) {
                            plugins.configs.utils.handleErrors(e, this)
                        })
                        .pipe(plugins.source(file))
                        .pipe(gulp.dest('./build/'))
                        .pipe(plugins.browserSync.reload({stream: true}));
            }

            return rebundle();
        }
    }
};
