module.exports = (gulp, plugins, utilities) => {
    return done => plugins.runSequence('clean', ['copy-assets', 'sass', 'eslint', 'scripts'], 'awspublish', done);
};