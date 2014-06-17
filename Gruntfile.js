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
                "demo/node.js",
                "test/*.spec.js"
            ]
        },
        uglify: {
            options: {
                preserveComments: "some",
                mangle: false,
                compress: true
            },
            all: {
                src: "src/blueprint.js",
                dest: "build/blueprint.min.js"
            }
        },
        jasmine: {
            all: {
                src: "src/blueprint.js",
                options: {
                    specs: "test/blueprint.spec.js"
                }
            }
        },
        watch: {
            js: {
                files: [
                    "Gruntfile.js",
                    "src/blueprint.js",
                    "demo/main.js",
                    "demo/node.js",
                    "test/*.spec.js"
                ],
                tasks: ["default"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("test", [
        "jshint:all",
        "jasmine:all"
    ]);

    grunt.registerTask("default", [
        "test",
        "uglify:all"
    ]);
};
