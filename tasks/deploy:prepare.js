module.exports = (gulp, plugins, utilities) => {
    return done => plugins.runSequence('clean', ['copy-assets', 'copy-html', 'sass', 'eslint', 'scripts'], 'inline', 'hash', 'hash-replace', done);
};
