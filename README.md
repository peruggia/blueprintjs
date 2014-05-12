BlueprintJS
===========

### What does it do?
If you work with a lot of generic objects (`{}`) in your code and you want to give special behavior to some or all of them, then BlueprintJS is the right tool for you.

### Creating a Blueprint
```javascript
var User = blueprint({
    name: "",
    lastName: "",
    fullName: function () {
        "use strict";
        // Never use this.name, always use the "get" and "set" methods
        return this.get("name") + " " + this.get("lastName");
    }
});
```

### Using the `User` Blueprint
```javascript
var someObjectIHaveInMyProject = {name: "Robert", lastName: "Baratheon"};

var user = new User(someObjectIHaveInMyProject);

// Now you get the "fullName" method for free!
console.log(user.get("fullName")); // Robert Baratheon

user.set("lastName", "Downey Jr.");

console.log(user.get("fullName")); // Robert Downey Jr.
```

### Casting a list of objects
```javascript
var listOfObjects = [
    {name:"John", lastName: "Blue"},
    {name:"Mary", lastName: "Red"},
    {name:"Richard", lastName: "Green"},
    {name:"Michael", lastName: "Gray"},
    {name:"Agatha", lastName: "Orange"}
];

// blueprint.cast(Blueprint, object_or_list_of_objects)
var listOfUsers = blueprint.cast(User, listOfObjects);

console.log(listOfUsers[1].get("fullName")); // Mary Red
```

### The special `init` method
```javascript
var Car = blueprint({
    init: function () {
        this.set("model", "BMW"); // It will replace the default model
    },
    model: "Mercedes Benz"
});

// The object is created and the "init()" method is called
var car = new Car();

console.log(car.get("model")); // BMW
```

> That's it. Any feedback will be appreciated.
