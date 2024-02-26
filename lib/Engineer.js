const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Allows for use of the Employee constructor parameters
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;