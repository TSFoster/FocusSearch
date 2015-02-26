'use strict';

var gulp   = require('gulp'            ),
    babel  = require('gulp-babel'      ),
    minify = require('gulp-minify-html'),
    rename = require('gulp-rename'     ),
    uglify = require('gulp-uglify'     );

var paths = (function(lib,dist) {
  return {
    dist: {
      base: dist
    },
    lib: {
      es6: [lib + '/*.es6'],
      html: [lib + '/*.html'],
      images: [lib + '/*.png']
    }
  };
})('lib','FocusSearch.safariextension');

var logAndIgnore = function(e){console.log(e.toString());this.emit('end');};

gulp.task('babel', function() {
  return gulp.src(paths.lib.es6)
    .pipe(babel())
    .on('error', logAndIgnore)
    .pipe(uglify())
    .pipe(rename({extname:'.js'}))
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('html', function() {
  return gulp.src(paths.lib.html)
    .pipe(minify())
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('images', function() {
  gulp.src(paths.lib.images)
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task('watch', function() {
  gulp.watch(paths.lib.es6, ['babel']);
  gulp.watch(paths.lib.html, ['html']);
  gulp.watch(paths.lib.images, ['images']);
});

gulp.task('compile', ['html', 'images', 'babel'], function(){});

gulp.task('default', ['compile', 'watch'], function(){});
