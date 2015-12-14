[![devDependency Status](https://david-dm.org/TenetPartners/react-seed/dev-status.svg)](https://david-dm.org/TenetPartners/react-seed#info=devDependencies)
[![Build Status](https://travis-ci.org/TenetPartners/tenet-holiday-card-2015.svg?branch=master)](https://travis-ci.org/TenetPartners/tenet-holiday-card-2015)
[![Coverage Status](https://coveralls.io/repos/TenetPartners/tenet-holiday-card-2015/badge.svg?branch=master&service=github)](https://coveralls.io/github/TenetPartners/tenet-holiday-card-2015?branch=master)

# Tenet Partners Holiday Card 2015

A short, fun questionnaire that stores and displays anonymous responses.

## Setup
Requires node and npm. `brew install node` gets you both.

1. `npm install`
2. `gulp`

## Build environment
Running `gulp` starts the development environment. All CSS and JS files are monitored and changes will automatically reload the browser via [browser-sync](http://www.browsersync.io/).

### CSS
Place Sass files in `./styles`. Write valid CSS and [autoprefixer](https://github.com/ai/autoprefixer) will take care of any vendor prefixes.

### JavaScript
Place your scripts in `./scripts`. Uses [browserify](http://browserify.org/articles.html) to bundle all client files together.

### Images or other assets
Create a `./assets` folder to place images, downloads, or other miscellaneous files. These will be automatically copied to the `./build` folder.

### Testing
Create a `__tests__` folder next to the scripts that you would like to run tests for. To enter test driven development mode, run `gulp tdd`. This will watch your test files and source files for changes and run tests automatically as a result. Run `gulp test` to run all tests once, or run `gulp test:coverage` for a complete code coverage report.

### Deploying
1. Create an AWS S3 bucket and get your credentials
2. AWS credentials are read from a file located according to the [AWS API guidelines](https://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html). (file located at `~/.aws/credentials`)
3. Add your AWS S3 bucket name to the object in ./gulp-utilities.js. You can add any key name you want i.e
```
deploySettings:{
    deployTarget: { // these should be aws s3 bucket names, called via gulp deploy --target={key}
        dev: "yourdevs3bucketname",
        prod: "yourprod3bucketname",
        another: "other"...
    },
    ...
}
```
4. Now you can run `gulp deploy --target=dev` (or any other target name) and your project will be cleaned, built and deployed.

***
Heavily inspired from [React for Beginners](https://github.com/wesbos/React-For-Beginners-Starter-Files) and [Testing ES6 React components with Gulp + Mocha + Istanbul](https://gist.github.com/yannickcr/6129327b31b27b14efc5).
