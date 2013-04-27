# Usage examples

## Basic Use
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