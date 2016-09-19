module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      test: {
        options: {
          port: 3001
        }
      }
    },
    protractor: {
      options: {
        keepAlive: true
      },
      all: {
        options: {
          configFile: 'spec/conf.js',
          webdriverManagerUpdate: true
        }
      }
    },
    serve: {
      options: {
        port: 3000
      }
    }
  });

  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('test', ['connect:test', 'protractor']);
}
