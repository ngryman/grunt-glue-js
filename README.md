# grunt-glue-js [![Build Status](https://travis-ci.org/ngryman/grunt-glue-js.png?branch=master)](https://travis-ci.org/ngryman/grunt-glue-js)

> Grunt task to build CommonJS modules for the browser using gluejs.


**This project is not maintained anymore, see [grunt-gluejs2](https://github.com/devatwork/grunt-gluejs2)



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-glue-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-glue-js');
```




## Gluejs task
_Run this task with the `grunt gluejs` command._

This task is designed to package __CommonJS__ modules into one file for the browser.
It directly depends on [gluejs].

[gluejs]: http://mixu.net/gluejs/
### Options

#### export
Type: `String`
Default: 

The name of the global variable the package is exported to.

Setting it to `App` will exports the package as `window.App`.
### Usage examples

#### Basic Use
In this example, `grunt gluejs` (or more verbosely, `grunt gluejs:app`) will package recursively every file in the directory `public/scripts` to one single file: `public/app.js`. The package will be available in a browser environement under one single global variable: `App`.

```javascript
// Project configuration.
grunt.initConfig({
  gluejs: {
    app: {
      options: {
        export: 'App',
        main: 'public/scripts/index.js'
      },
      src: 'public/scripts/**/*.js',
      dest: 'public/app.js'
    }
  }
});
```

#### Advanced
In this example, we use `coffeeify` to package our CoffeeScript app. We also showcase some more options.

```javascript
// Project configuration.
grunt.initConfig({
  gluejs: {
    app: {
      options: {
        export: 'App',
        report: true,
        debug: true,
        transform: 'coffeeify',
        replace: {
          jQuery: 'window.jQuery'
        },
        main: 'public/scripts/index.coffee'
      },
      src: 'public/scripts/**/*.coffee',
      dest: 'public/app.js'
    }
  }
});
```

## Release History

 * 2014-04-07   v0.0.5   Switch to `gluejs` v2 (2.3.7).
 * 2013-12-10   v0.0.4   Set `gluejs` as an `npm` dep as requested fixes are now released.
 * 2013-05-24   v0.0.3   `basepath` and `main` options support.
 * 2013-04-28   v0.0.2   Upgraded grunt-contrib-internal dep. Published to npm.
 * 2013-04-27   v0.0.1   Initial release.

---

Task submitted by ["ngryman" Nicolas Gryman](http://ngryman.sh)

*This file was generated on Sun Apr 28 2013 14:28:22.*
