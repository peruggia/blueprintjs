/* global describe, it, expect, blueprint, beforeEach */

describe("Enviroment Variables", function () {
    "use strict";
    it("Blueprint global variable must be defined", function () {
        expect(blueprint).toBeDefined();
    });
});

describe("Blueprint utils", function () {
    "use strict";
    var User;

    beforeEach(function () {
        User = blueprint({
            name: "",
            lastName: "",
            fullName: function () {
                return this.get("name") + " " + this.get("lastName");
            }
        });
    });

    it(
        "Casting a list of generic objects to a list of blueprint objects",
        function () {
            var listOfObjects = [
                {name:"John", lastName: "Blue"},
                {name:"Mary", lastName: "Red"},
                {name:"Richard", lastName: "Green"},
                {name:"Michael", lastName: "Gray"},
                {name:"Agatha", lastName: "Orange"}
            ];
            var listOfUsers = blueprint.cast(User, listOfObjects);
            expect(listOfUsers[2].get("fullName")).toBe("Richard Green");
        }
    );
    it("Casting a single generic object to a blueprint object", function () {
        var obj = {name:"Agatha", lastName: "Orange"};
        var user = blueprint.cast(User, obj);
        expect(user.get("fullName")).toBe("Agatha Orange");
    });
});

describe("Blueprint tests", function () {
    "use strict";
    it("Blueprint object creation", function () {
        var User = blueprint({name: "Michael"});
        var user = new User({lastName: "Jackson"});
        expect(user.get("name")).toBe("Michael");
    });
    it("Should execute the init method", function () {
        var User = blueprint({
            init: function () {
                this.set("name", "John");
            },
            name: "Michael"
        });
        var user = new User();
        expect(user.get("name")).toBe("John");
    });
    it("Should execute the custom init method", function () {
        var User = blueprint({
            init: function () {
                this.set("name", "John");
            },
            name: "Michael"
        });
        var user = new User({
            init: function () {
                this.set("name", "Marcus");
            }
        });
        expect(user.get("name")).toBe("Marcus");
    });
    it("Should build the plain object from a Blueprint", function () {
        var User = blueprint({
            name: "",
            lastName: "",
            fullName: function () {
                return this.get("name") + " " + this.get("lastName");
            }
        });
        var custom = {name: "James", lastName: "Cameron"};
        var user = new User(custom);
        var plainUser = blueprint.toPlainObject(user);
        expect(plainUser.fullName).toBe("James Cameron");
    });
});