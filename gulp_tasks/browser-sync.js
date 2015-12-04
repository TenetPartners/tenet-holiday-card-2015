module.exports = (gulp, plugins, configs) => {
    return () => {
        return plugins.browserSync({
        server : {},
        //middleware : [ historyApiFallback() ],
        ghostMode: false
      });
    };
};