module.exports = (gulp, plugins, configs) => {
    return () => {
        let publisher = plugins.awspublish.create({
            params: {
                Bucket: 'holiday2015.teetpartners.com'
            }
        });
        return gulp.src('./build/**/*')
            .pipe(publisher.publish())
            .pipe(publisher.cache())
            .pipe(plugins.awspublish.reporter());
    }
};