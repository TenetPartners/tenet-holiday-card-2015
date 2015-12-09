module.exports = (gulp, plugins, configs) => {
    return () => {
      return plugins.browserSync({
        server : {
          baseDir: configs.BUILD_FOLDER
        },
        //middleware : [ historyApiFallback() ],
        ghostMode: false
      });
    };
};
