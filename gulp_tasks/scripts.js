module.exports = (gulp, plugins, configs) => {
    return () => {
        plugins.buildScript('./main.js', false, plugins, configs, gulp); // this will run once because we set watch to false
    };
};