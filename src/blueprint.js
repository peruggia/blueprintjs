/* global window, module, define */
(function (blueprint) {
    "use strict";
    if (typeof module !== "undefined" &&
        typeof module.exports !== "undefined") {
        module.exports = blueprint();
    } else if (typeof define === "function" && define.amd) {
        define([], function() {
            return blueprint();
        });
    } else {
        window.blueprint = blueprint();
    }
}(function () {
    "use strict";

    // Internal Utilities
    var utils = {
        sliceArguments: function (args) {
            return Array.prototype.slice.call(args, 1);
        }
    };

    var blueprint = function (properties) {
        var initialProperties;

        if (typeof properties === "object" &&
            properties instanceof Object) {
            initialProperties = properties;
        } else {
            throw new Error(
                "To make a Class an Object with its properties is required"
            );
        }

        var blueprintObject = function (extraProperties) {
            this.extendedProperties = extraProperties || {};
        };

        blueprintObject.prototype = {
            get: function (propertyName) {
                var args = utils.sliceArguments(arguments);
                var value = this.extendedProperties[propertyName] ||
                initialProperties[propertyName];
                if (typeof value === "function") {
                    return value.apply(this, args);
                }
                return value;
            },
            set: function (propertyName, propertyValue) {
                this.extendedProperties[propertyName] = propertyValue;
            }
        };

        return blueprintObject;
    };

    // Blueprint Utilities
    blueprint.cast = function (Blueprint, objectOrArray) {
        var i, total, listOfObjects;
        if (objectOrArray instanceof Array) {
            total = objectOrArray.length;
            listOfObjects = [];
            for (i = 0; i < total; i += 1) {
                listOfObjects.push(new Blueprint(objectOrArray[i]));
            }
            return listOfObjects;
        } else if (objectOrArray instanceof Object) {
            return new Blueprint(objectOrArray);
        }
        return null;
    };

    return blueprint;
}));