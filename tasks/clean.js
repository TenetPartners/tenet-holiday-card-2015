module.exports = (gulp, plugins, configs) => {
    return () => {
        return gulp.src(configs.BUILD_FOLDER, {read: false}).pipe(plugins.clean());
    };
};
