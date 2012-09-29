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

  grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
    grunt.config.set(name, val);
  });

  /* TODO: remove once this feature has been merged into npm grunt
   * https://github.com/cowboy/grunt/issues/236 */
  grunt.registerTask('wait', 'Wait forever.', function() {
    grunt.log.write('Waiting...');
    this.async();
  });

  grunt.registerTask('default', 'lint');
};
