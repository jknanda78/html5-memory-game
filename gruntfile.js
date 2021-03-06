var timer = require("grunt-timer");

module.exports = function(grunt) {
  timer.init(grunt);
  grunt.initConfig({
    clean: {
      browserify: ['spec/spec-bundle.js']
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          require: 'susy'
        },
        files: [{
          src: ['sass/style.scss'],
          dest: 'css/style.css'
        }]
      }
    },
    browserify: {
      test: {
        src: ['spec/*.js'],
        dest: 'spec/spec-bundle.js',
        options: {
          transform: [
            ["babelify", {
              "presets": ["es2015", "react"]
            }]
          ]
        }
      }
    },
    jasmine: {
      test: {
        options: {
          specs: 'spec/spec-bundle.js'
        }
      }
    },
    githooks: {
      all: {
        'pre-commit': 'test'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-githooks');

  grunt.registerTask('default', ['sass', 'clean:browserify', 'browserify:test', 'jasmine:test']);
  grunt.registerTask('test', ['clean:browserify', 'browserify:test', 'jasmine:test']);
  grunt.registerTask('scss', ['sass']);
};
