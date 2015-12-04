module.exports = (gulp, plugins, configs) => {
    return (done) => {
        plugins.runSequence('coverage:instrument', 'test', 'coverage:report', done);
    }
};