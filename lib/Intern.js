const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        // Allows for use of the Employee constructor parameters
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;
