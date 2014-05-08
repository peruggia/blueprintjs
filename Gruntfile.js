/* global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                "Gruntfile.js",
                "src/blueprint.js",
                "demo/main.js",
                "demo/node.js"
            ]
        },
        uglify: {
            options: {
                preserveComments: "some",
                mangle: true,
                compress: true
            },
            all: {
                src: "src/blueprint.js",
                dest: "build/blueprint.min.js"
            }
        },
        watch: {
            js: {
                files: [
                    "Gruntfile.js",
                    "src/blueprint.js",
                    "demo/main.js",
                    "demo/node.js"
                ],
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
