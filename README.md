blueprintjs
===========

Transform genetic objects into a specific class object

We create a simple "class" called `User`

    var User = blueprint({
        name: "",
        lastName: "",
        fullName: function () {
            "use strict";
            return this.get("name") + " " + this.get("lastName");
        }
    });

Then we instantiate it with an existing generic object, and the generic object
gets the `fullName` method for free.

    var user = new User({name: "Robert", lastName: "Baratheon"});
    console.log(user.get("fullName")); // Robert Baratheon