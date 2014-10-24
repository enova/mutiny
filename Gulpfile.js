var gulp = require('gulp-help')(require('gulp'));
var jshint = require('gulp-jshint');
var mochaPhantom = require('gulp-mocha-phantomjs');
var connect = require('gulp-connect');

gulp.task('lint', function(){
  return gulp.src(['./Gulpfile.js', './package.json',
                   './benchmark/**/*.js',
                   './src/**/*.js',
                   './spec/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['lint'], function(){
  return gulp
    .src('mocha.html')
    .pipe(mochaPhantom());
});

gulp.task('server', function() {
  var argv = require('yargs').argv;
  return connect.server({
    port: argv.p || argv.port || 8000
  });
});
