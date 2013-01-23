module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title %> v<%= pkg.version %> - <%= pkg.homepage %> */\n',

    jshint: {
      grunt: ['Gruntfile.js'],
      src: ['src/**/*.js'],
      spec: ['spec/**/*.js']
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>',
        separator: ';'
      },

      dist: {
        files: {
          'dist/<%= pkg.name %>.js': ['src/**/*.js']
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },

      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask('dist', ['concat', 'uglify']);
};
