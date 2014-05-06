// Simple "Class"
var User = blueprint({
    name: "",
    lastName: "",
    fullName: function () {
        return this.get("name") + " " + this.get("lastName");
    }
});