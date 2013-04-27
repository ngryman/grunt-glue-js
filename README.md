# grunt-contrib-gluejs [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-gluejs.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-gluejs)

> Grunt task to build CommonJS modules for the browser using gluejs.


_Note that this is not an official Grunt plugin release! If you want to use this in a project, please be sure to follow the instructions for installing development versions, as outlined in the [Installing Grunt](http://gruntjs.com/installing-grunt) guide._


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-gluejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-gluejs');
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
        export: 'App'
      },
      src: 'public/scripts/**/*.js',
      dest: 'public/app.js'
    }
  }
});
```

## Release History

_(Nothing yet)_


---

Task submitted by ["ngryman" Nicolas Gryman](http://ngryman.sh)

*This file was generated on Sat Apr 27 2013 17:13:09.*
