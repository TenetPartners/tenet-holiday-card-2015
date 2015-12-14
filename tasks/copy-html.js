module.exports = (gulp, plugins, utilities) => {
  return () => gulp.src(utilities.paths.HTML_FILES)
      .pipe(gulp.dest(utilities.paths.BUILD_FOLDER))
      .pipe(plugins.browserSync.reload({stream:true}));
};
