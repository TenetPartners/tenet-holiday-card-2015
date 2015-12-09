module.exports = (gulp, plugins, utilities) => {
    return done => plugins.runSequence('clean', ['copy-assets', 'copy-html', 'sass', 'eslint', 'scripts'], 'hash', 'hash-replace', done);
};
