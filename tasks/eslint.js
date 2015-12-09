module.exports = (gulp, plugins, utilities) => {
    return () => {
        return gulp.src(utilities.paths.JS_SRC)
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