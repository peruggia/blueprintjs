/* global blueprint, console, document */

// Simple "Class"
var User = blueprint({
    name: "",
    lastName: "",
    fullName: function () {
        "use strict";
        return this.get("name") + " " + this.get("lastName");
    }
});

var Car = blueprint({
    isExpensive: (function (){
        "use strict";
        var expensiveBrands = {
            bmw: true,
            mercedez: true
        };
        return function () {
            if (expensiveBrands[this.get("brand")]) {
                return true;
            }
            return false;
        };
    }())
});

// Simple generic object
var simpleAlreadyExistingObject = {name: "Robert", lastName: "Baratheon"};

// Transforms it into a User object
var user = new User(simpleAlreadyExistingObject);
var car = new Car({brand:"bmw"});

// Use the get() method to get properties
console.log(user.get("fullName"));
console.log("Is the car expensive? " + car.get("isExpensive"));

user.set("lastName", "Downey Jr.");

console.log(user.get("fullName"));

var plainObject = blueprint.toPlainObject(user);
console.log(plainObject);

// List of generic objects
var listOfObjects = [
    {name:"John", lastName: "Blue"},
    {name:"Mary", lastName: "Red"},
    {name:"Richard", lastName: "Green"},
    {name:"Michael", lastName: "Gray"},
    {name:"Agatha", lastName: "Orange"}
];

var listOfUsers = blueprint.cast(User, listOfObjects);

console.log(listOfUsers);

// Create the <li> tags based on the listOfObjects
(function (){
    "use strict";
    var listDOM = document.getElementById("list");
    var i = 0;
    var total = listOfObjects.length;
    var currentUser;
    var text;
    var li;
    for (i; i < total; i += 1) {
        li = document.createElement("li");
        currentUser = new User(listOfObjects[i]);
        text = document.createTextNode(currentUser.get("fullName"));
        li.appendChild(text);
        listDOM.appendChild(li);
    }
}());