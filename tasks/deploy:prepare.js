module.exports = (gulp, plugins, configs) => {
    return done => {
        return plugins.runSequence('clean', ['copy-assets', 'copy-html', 'sass', 'eslint', 'scripts'], 'hash', 'hash-replace', done);
    }
};
