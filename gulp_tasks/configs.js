module.exports = {
    SRC_FILES: './scripts/**/*.js',
    BABEL_PRESETS: ["stage-0", "es2015", "react"],
    TEST_FILES: './scripts/**/__tests__/**/*.js',
    handleErrors: () => {
        var args = Array.prototype.slice.call(arguments);
        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);
        this.emit('end'); // Keep gulp from hanging on this task
    }
};