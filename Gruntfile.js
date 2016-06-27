module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      build: {
        files: {
          'responsive-src.js': 'src/responsive-src.js'
        }
      }
    },
    watch: {
      source: {
        files: ['src/*.js'],
        tasks: ['babel:build', 'exec:copyDevJs']
      },
      htmls: {
        files: ['*.html'],
        tasks: ['exec:copyDevHtml']
      }
    },

    exec: {
      prepareFolder: 'mkdir -p _site',
      copyDevHtml: 'mkdir -p _site && cp -rf index.html _site/',
      copyDevJs: 'mkdir -p _site && cp -rf responsive-src.js _site/'
    },

    connect: {
      server: {
        options: {
          port: 3010,
          base: '_site'
        }
      }
    }

  });

  grunt.registerTask('default', ['babel']);
  grunt.registerTask('dev', ['babel', 'exec', 'connect:server', 'watch']);
};

