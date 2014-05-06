var simpleAlreadyExistingObject = {name: "Robert", lastName: "Baratheon"};

// Transforms it into a User object
var user = new User(simpleAlreadyExistingUser);

// Use the get() method to get properties
console.log(user.get("fullName"));