module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      meta: ['Gruntfile.js', 'package.json'],
      src:  ['src/**/*.js'],
      spec: ['spec/**/*.js']
    },

    concat: {
      build: {
        dest:         'dist/<%= pkg.name %>.js',
        src:          ['src/**/*.js'],
        separator:    ';',
        stripBanners: true
      }
    },

    wrap: {
      modules: {
        dest:    '',
        src:     ['dist/<%= pkg.name %>.js'],
        wrapper: ['(function(window, $, undefined) {\n', '\n})(window, jQuery);']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.title %> v<%= pkg.version %> - <%= pkg.homepage %> */\n'
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
        specs:  ['spec/*_spec.js', 'spec/widgets/*_spec.js'],
        vendor: ['vendor/jquery.js', 'vendor/jquery-ui.js', 'vendor/jasmine-jquery.js']
      },

      src: {
        src:   ['src/**/*.js'],
        specs: ['spec/**/*_spec.js']
      },
      build: ['dist/<%= pkg.name %>.js'],
      min:   ['dist/<%= pkg.name %>.min.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('dist-build', ['concat', 'wrap', 'uglify']);
  grunt.registerTask('dist',       ['concat', 'wrap', 'uglify', 'jasmine:build', 'jasmine:min']);
  grunt.registerTask('test',       ['jshint:meta', 'jshint:src', 'jasmine:src']);
  grunt.registerTask('test-all',   ['jshint:meta', 'jshint:src', 'dist-build', 'jasmine']);
  grunt.registerTask('default',    ['test']);
};
