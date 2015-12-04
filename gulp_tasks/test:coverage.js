module.exports = (gulp, plugins, configs) => {
    return done => {
        configs.exitAfterTest = false;
        return plugins.runSequence('coverage:instrument', 'test', 'coverage:report', done);
    }
};