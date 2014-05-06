/* global window */
(function () {
    "use strict";

    window.blueprint = function (properties) {
        var initialProperties;

        if (typeof properties === "object" &&
            properties instanceof Object) {
            initialProperties = properties;
        } else {
            throw new Error(
                "To make a Class an Object with its properties is required"
            );
        }

        var blueprintCreator = function (extraProperties) {
            this.extendedProperties = extraProperties || {};
        };

        blueprintCreator.prototype = {
            get: function (propertyName) {
                var value = this.extendedProperties[propertyName] ||
                initialProperties[propertyName];
                if (typeof value === "function") {
                    return value.call(this);
                }
                return value;
            }
        };

        return blueprintCreator;
    };
}());