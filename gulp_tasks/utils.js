module.exports = (() => {
    return {
        handleErrors: () => {
            var args = Array.prototype.slice.call(arguments);
            notify.onError({
                title: 'Compile Error',
                message: '<%= error.message %>'
            }).apply(this, args);
            this.emit('end'); // Keep gulp from hanging on this task
        }
    }
})();