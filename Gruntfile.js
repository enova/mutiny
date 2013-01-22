module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js', 'site/page.js']
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
};
