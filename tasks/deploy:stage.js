module.exports = (gulp, plugins, configs) => {
    return done => {
        return plugins.runSequence('deploy:prepare', 'awspublish', done);
    }
};
