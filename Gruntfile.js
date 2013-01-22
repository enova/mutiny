module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */\n',
        separator: ';'
      },

      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= concat.options.banner %>'
      },

      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', 'jshint');
};
