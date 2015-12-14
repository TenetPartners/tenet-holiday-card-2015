module.exports = (gulp, plugins, utilities) => {
    return done => {
        utilities.exitAfterTest = false;
        return plugins.runSequence('coverage:instrument', 'test', 'coverage:report', done);
    }
};
