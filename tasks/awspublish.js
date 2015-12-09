module.exports = (gulp, plugins, utilities) => {
    return () => {
        let publisher = plugins.awspublish.create({
            params: {
                Bucket: utilities.deployTarget[utilities.args.target]
            }
        });
        return gulp.src([`${utilities.paths.BUILD_FOLDER}/**/*`])
            .pipe(plugins.awspublish.gzip())
            .pipe(publisher.publish())
            .pipe(publisher.sync())
            .pipe(publisher.cache())
            .pipe(plugins.awspublish.reporter());
    }
};
