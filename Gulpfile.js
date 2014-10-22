var gulp = require('gulp-help')(require('gulp'));
var jshint = require('gulp-jshint');
var mochaPhantom = require('gulp-mocha-phantomjs');

gulp.task('lint', function(){
  return gulp.src(['./Gulpfile.js', './package.json',
                   './src/**/*.js',
                   './spec/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('test', function () {
  return gulp
    .src('mocha.html')
    .pipe(mochaPhantom());
});
