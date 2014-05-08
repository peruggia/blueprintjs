/* global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: ["Gruntfile.js", "blueprint.js", "main.js", "node.js"]
        },
        uglify: {
            options: {
                preserveComments: "some",
                mangle: true,
                compress: true
            },
            all: {
                src: "blueprint.js",
                dest: "blueprint.min.js"
            }
        },
        watch: {
            js: {
                files: ["Gruntfile.js", "blueprint.js", "main.js"],
                tasks: ["default"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", [
        "jshint:all",
        "uglify:all"
    ]);
};
