const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let team = [];
let officeNum;
let gitHub;
let employee;
async function askQuestions() {
  employee = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employees name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the employees id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the employees email?",
      name: "email",
    },
    {
      type: "list",
      message: "What is the employees title?",
      name: "role",
      choices: ["Engineer", "Intern", "Manager"],
    },
  ]);
  return employee;
}
async function beginning() {
  let employee = await askQuestions();

  switch (employee.role) {
    case "Manager":
      officeNum = await inquirer.prompt([
        {
          type: "input",
          message: "What is your Manager's contact number?",
          name: "officeNum",
        },
      ]);

      const manager = new Manager(
        employee.name,
        employee.id,
        employee.email,
        officeNum.officeNum
      );
      team.push(manager);

      break;
    case "Engineer":
      gitHub = await inquirer.prompt([
        {
          type: "input",
          message: "What is your GitHub username?",
          name: "gitHub",
        },
      ]);
      const engineer = new Engineer(
        employee.name,
        employee.id,
        employee.email,
        gitHub.gitHub
      );
      team.push(engineer);
      break;
    case "Intern":
      school = await inquirer.prompt([
        {
          type: "input",
          message: "What school does your intern attend?",
          name: "school",
        },
      ]);
      const intern = new Intern(
        employee.name,
        employee.id,
        employee.email,
        school.school
      );
      team.push(intern);
      break;
    default:
  }
  anotherEmployee = await inquirer.prompt([
    {
      type: "list",
      choices: ["yes", "no"],
      message: "Would you like to add another employee?",
      name: "anotherEmployee",
    },
  ]);
  if (anotherEmployee.anotherEmployee === "yes") {
    beginning();
  } else {
    console.log(team);
    const createTeam = render(team);
    fs.writeFile(outputPath, createTeam, (err) => {
      if (err) throw console.log(err);
      console.log("File Created");
    });
  }
}
beginning();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
