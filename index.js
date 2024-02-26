const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// Initialises an array to hold the team members
let team = [];

// Acts as the main menu
function addTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which type of team member would you like to add?',
            choices: ['Manager', 'Engineer', 'Intern', "I don't want to add more team members"]
        }
    ]).then(answer => {
        switch (answer.role) {
            case 'Manager':
                addManager();
                break;
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            default:
                renderHTML();
        }
    });
}

function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the team manager's name?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the team manager's ID?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the team manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the team manager's office number?"
        }
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
        team.push(manager);
        addTeam();
    });
}

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "What is the engineer's ID?"
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is the engineer's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?"
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);
        team.push(engineer);
        addTeam();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: "What is the intern's name?"
        },
        {
            type: 'input',
            name: 'internId',
            message: "What is the intern's ID?"
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What is the intern's email?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the intern's school?"
        }
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school);
        team.push(intern);
        addTeam();
    });
}

function renderHTML() {
    // Check if the output directory exists
        if (!fs.existsSync(OUTPUT_DIR)) {
    // Create the output directory if it does not exist
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
    const htmlContent = render(team);
    // Writes data to the file team.html
    fs.writeFile(outputPath, htmlContent, err => {
        if (err) throw err;
        console.log('Team page has been generated successfully!');
    });
}

// Starts the application, use "node index.js"
addTeam();



