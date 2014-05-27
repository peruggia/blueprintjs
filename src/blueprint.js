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
            var init = this.get("init");
            if (typeof init === "function") {
                init();
            }
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
            },
            getProperties: function () {
                var properties = [];
                var existingProperties = {};
                var key;
                for (key in initialProperties) {
                    if (initialProperties.hasOwnProperty(key)) {
                        if (! existingProperties[key]) {
                            existingProperties[key] = true;
                            properties.push(key);
                        }
                    }
                }
                for (key in this.extendedProperties) {
                    if (this.extendedProperties.hasOwnProperty(key)) {
                        if (! existingProperties[key]) {
                            existingProperties[key] = true;
                            properties.push(key);
                        }
                    }
                }
                return properties;
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

    blueprint.toPlainObject = function (blueprintObject) {
        var plainObject = {};
        var properties;
        var i;
        var total;
        if (blueprintObject && typeof blueprintObject === "object") {
            properties = blueprintObject.getProperties();
            total = properties.length;
            for (i = 0; i < total; i += 1) {
                plainObject[properties[i]] = blueprintObject.get(properties[i]);
            }
        }
        return plainObject;
    };

    return blueprint;
}));