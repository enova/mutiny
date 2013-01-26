module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      grunt: ['Gruntfile.js'],
      src: ['src/**/*.js'],
      spec: ['spec/**/*.js']
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
          'dist/<%= pkg.name %>.js': ['src/**/*.js']
        }
      },

      min: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/**/*.js']
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
      mutiny: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/**/*_spec.js',
          vendor: ['vendor/jquery.js', 'vendor/jquery-ui.js', 'vendor/jasmine-jquery.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask('dist', ['uglify']);
};
