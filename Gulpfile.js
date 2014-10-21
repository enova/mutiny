var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function(){
  return gulp.src(['./Gulpfile.js', './package.json',
                   './src/**/*.js',
                   './spec/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
