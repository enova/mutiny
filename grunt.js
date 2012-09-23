module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/**/*.js', 'spec/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    }
  });

  grunt.registerTask('default', 'lint');
};
