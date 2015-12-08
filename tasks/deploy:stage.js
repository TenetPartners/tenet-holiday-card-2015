module.exports = (gulp, plugins, configs) => {
    return done => {
        return plugins.runSequence('clean', ['copy-assets', 'sass', 'eslint', 'scripts'], 'awspublish', done);
    }
};