module.exports = (gulp, plugins, configs) => {
    return () => {
        let publisher = plugins.awspublish.create({
            params: {
                Bucket: '...'
            }
        });
    };
};