module.exports = (gulp, plugins, configs) => {
    return () => {
        let publisher = plugins.awspublish.create({
            params: {
                Bucket: 'holiday2015.tenetpartners.com'
            }
        });
        return gulp.src(['./build/**/*', './index.html'])
            .pipe(publisher.publish())
            .pipe(publisher.sync())
            .pipe(publisher.cache())
            .pipe(plugins.awspublish.reporter());
    }
};