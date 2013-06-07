module.exports = function(grunt) {
  var banner = '/*! <%= pkg.title %> v<%= pkg.version %> - <%= pkg.homepage %> */\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      meta: ['Gruntfile.js', 'package.json'],
      src:  ['src/**/*.js'],
      spec: ['spec/**/*.js']
    },

    concat: {
      options: {
        banner: banner +
                '(function(window, $, undefined) {\n',
        footer: '\n})(window, jQuery);'
      },

      dist: {
        files: {
          'dist/<%= pkg.name %>.js': ['src/**/*.js']
        }
      }
    },

    uglify: {
      options: {
        banner: banner
      },

      min: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: grunt.option('port') || 8000,
          keepalive: true
        }
      }
    },

    jasmine: {
      options: {
        specs:  ['spec/func/**/*_spec.js'],
        vendor: ['vendor/jquery.js', 'vendor/jquery-ui.js', 'vendor/jasmine-jquery.js']
      },

      src: {
        src:   ['src/**/*.js'],
        options: {
          specs: ['spec/unit/**/*_spec.js',
                  'spec/func/**/*_spec.js']
        }
      },
      build: ['dist/<%= pkg.name %>.js'],
      min:   ['dist/<%= pkg.name %>.min.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('dist-build', ['concat', 'uglify']);
  grunt.registerTask('dist',       ['dist-build', 'jasmine:build', 'jasmine:min']);
  grunt.registerTask('test',       ['jshint:meta', 'jshint:src', 'jasmine:src']);
  grunt.registerTask('test-all',   ['jshint:meta', 'jshint:src', 'dist-build', 'jasmine']);
  grunt.registerTask('default',    ['test']);
};
