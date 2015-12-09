module.exports = (gulp, plugins, utilities) => {
    return () => plugins.browserSync({
        server : {},
        serveStatic: ['./build'],
        ghostMode: false
      });
};