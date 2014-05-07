/* global window */
(function () {
    "use strict";

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
                var value = this.extendedProperties[propertyName] ||
                initialProperties[propertyName];
                if (typeof value === "function") {
                    return value.call(this);
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

    window.blueprint = blueprint;
}());