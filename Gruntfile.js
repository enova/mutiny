module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      meta: ['Gruntfile.js', 'package.json'],
      src: ['src/**/*.js'],
      spec: ['spec/**/*.js']
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },

      build: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    wrap: {
      modules: {
        src: 'dist/<%= pkg.name %>.js',
        dest: '',
        wrapper: ['(function(window, $, undefined) {\n', '\n})(window, jQuery);']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.title %> v<%= pkg.version %> - <%= pkg.homepage %> */\n'
      },

      base: {
        options: {
          beautify: true,
          mangle: false,
          compress: false
        },
        files: {
          'dist/<%= pkg.name %>.js': 'dist/<%= pkg.name %>.js'
        }
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
        specs: 'spec/**/*_spec.js',
        vendor: ['vendor/jquery.js', 'vendor/jquery-ui.js', 'vendor/jasmine-jquery.js']
      },

      src: {
        src: 'src/**/*.js'
      },

      build: {
        src: 'dist/<%= pkg.name %>.js'
      },

      min: {
        src: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('dist-build', ['concat', 'wrap', 'uglify']);
  grunt.registerTask('dist', ['concat', 'wrap', 'uglify', 'jasmine:build', 'jasmine:min']);
  grunt.registerTask('test', ['jshint', 'jasmine:src']);
  grunt.registerTask('test-all', ['jshint', 'dist-build', 'jasmine']);
  grunt.registerTask('default', 'test');
};
