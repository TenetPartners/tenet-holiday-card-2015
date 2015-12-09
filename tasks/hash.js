module.exports = (gulp, plugins, configs) => {
  return () => {
    return gulp.src([
      `${configs.BUILD_FOLDER}/**/*.css`,
      `${configs.BUILD_FOLDER}/**/*.js`,
      `${configs.BUILD_FOLDER}/**/*.png`,
      `${configs.BUILD_FOLDER}/**/*.jpg`,
      `${configs.BUILD_FOLDER}/**/*.gif`,
      `${configs.BUILD_FOLDER}/**/*.ico`,
      `${configs.BUILD_FOLDER}/**/*.svg`,
    ])
      .pipe(plugins.clean()) // delete original files
      .pipe(plugins.rev())
      .pipe(gulp.dest(configs.BUILD_FOLDER))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(configs.BUILD_FOLDER));
  };
};
