module.exports = (gulp, plugins, configs) => {
    return () => {
        return gulp.src(configs.SRC_FILES)
            .pipe(plugins.eslint({
                baseConfig: {
                    "env": {
                        "browser": true,
                        "node": true,
                        "mocha": true,
                        "es6": true
                    },
                    "ecmaFeatures": {
                        "modules": true,
                        "jsx": true
                    },
                    "extends": "eslint:recommended",
                    "plugins": [
                        "react"
                    ],
                    "rules": {
                        "react/jsx-uses-react": 2
                    }
                }
            }))
            .pipe(plugins.eslint.format());
    };
};