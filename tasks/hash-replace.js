module.exports = (gulp, plugins, configs) => {
  // return done => {
  //   var manifest = gulp.src(`./${configs.BUILD_FOLDER}/rev-manifest.json`);
  //   return plugins.runSequence('hash', function() {
  //     gulp.src([`${configs.BUILD_FOLDER}/**/*.html`, `${configs.BUILD_FOLDER}/**/*.css`, `${configs.BUILD_FOLDER}/**/*.js`])
  //       .pipe(plugins.revReplace({manifest: manifest}))
  //       .pipe(gulp.dest(configs.BUILD_FOLDER))
  //     done();
  //   });
  // }
  return () => {
    var manifest = gulp.src(`./${configs.BUILD_FOLDER}/rev-manifest.json`);
    return gulp.src([
      `${configs.BUILD_FOLDER}/**/*.html`,
      `${configs.BUILD_FOLDER}/**/*.css`,
      `${configs.BUILD_FOLDER}/**/*.js`
    ])
      .pipe(plugins.revReplace({manifest: manifest}))
      .pipe(gulp.dest(configs.BUILD_FOLDER))
  };
};
