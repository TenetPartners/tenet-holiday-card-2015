module.exports = (gulp, plugins, configs) => {
    return () => {
        return configs.utils.buildScript('./main.js', false, plugins, gulp); // this will run once because we set watch to false
    };
};