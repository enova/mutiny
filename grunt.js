module.exports = function(grunt) {
  grunt.initConfig({
    meta: {
      banner: '/*! Mutiny - https://github.com/enova/mutiny */'
    },

    concat: {
      dist: {
        src: ['<banner>', 'src/**/*.js'],
        dest: 'dist/mutiny.js'
      }
    },

    min: {
      dist: {
        src: ['<banner>', 'dist/mutiny.js'],
        dest: 'dist/mutiny.min.js'
      }
    },

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
