module.exports = (gulp, plugins, configs) => {
    return () => {
        plugins.browserSync({
        server : {},
        //middleware : [ historyApiFallback() ],
        ghostMode: false
      });
    };
};