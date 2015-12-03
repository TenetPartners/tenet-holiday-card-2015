module.exports = (gulp, plugins, configs) => {
    return () => {
        gulp.src('./styles/**/*.scss')
            .pipe(plugins.sass({
                outputStyle: 'compressed'
            }))
            .on('error', configs.handleErrors)
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
            .on('error', configs.handleErrors)
            .pipe(gulp.dest('./build/'))
            .pipe(plugins.reload({stream:true}))
    };
};