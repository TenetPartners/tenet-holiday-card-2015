module.exports = (gulp, plugins, configs) => {
  return () => {
    return gulp.src(configs.HTML_FILES)
      // .on('error', function(e){plugins.configs.utils.handleErrors(e, this)})
      .pipe(gulp.dest(configs.BUILD_FOLDER))
  };
};
