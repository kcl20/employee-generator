const inquirer = require('inquirer');
const fs = require('fs');
const { doesNotMatch } = require('assert');

// declare variables
var manager = 
    {
        name: '',
        employeeID: '',
        email: '',
        officeNumber: '',
    };

var engineers = [
    {
        name: '',
        employeeID: '',
        email: '',
        github: '',
    }
];

var interns = [
    {
        name: '',
        employeeID: '',
        email: '',
        school: '',
    }
];


console.log('Welcome to the Team Profile Generator!');
console.log('Please answer the following questions to generate your team profile.');
console.log('As the team manager, please enter your information first.\n');

function init() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'employeeID',
        message: 'What is your Employee ID?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
      },
      {
          type: 'input',
          name: 'officeNumber',
          message: 'What is your office number?',
      }
    ])
    .then((data) => {
        manager.name = data.name;
        manager.employeeID = data.employeeID;
        manager.email = data.email;
        manager.officeNumber = data.officeNumber;
        console.log("This is the manager: " + manager.name +  "\nEmployee ID: " + manager.employeeID + "\nEmail: " + manager.email + "\nOffice Number: " + manager.officeNumber);
        EngineerOrIntern();
      });
}


function EngineerOrIntern () {
    inquirer
         .prompt([
            {
            type: 'list',
            name: 'nextAction',
            message: 'Do you want to add an engineer or an intern?',
            choices: ['Engineer', 'Intern',"Neither, I'm done."],
            },
            ])
    .then((data) => {
    if (data.nextAction === 'Engineer') {
        addEngineer();
        return;
    } else if (data.nextAction === 'Intern') {
        addIntern();
        return;
    } else if (data.nextAction == "Neither, I'm done.") {
      // printHTML();
      console.log("Completed, generating HTML.")}
    })
  };


function addEngineer () {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is your engineer's name?",
      },
      {
        type: 'input',
        name: 'employeeID',
        message: "What is your engineer's Employee ID?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your engineer's email?",
      },
      {
        type: 'input',
        name: 'github',
        message: "What is your engineer's github username?",
      },
    ])
    .then(()=>{
      EngineerOrIntern();
    });

}

function addIntern () {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is your intern's name?",
      },
      {
        type: 'input',
        name: 'employeeID',
        message: "What is your intern's Employee ID?",
        },
        {
        type: 'input',
        name: 'email',
        message: "What is your intern's email?",
        },
        {
        type: 'input',
        name: 'school',
        message: "What is your intern's school?",
        },
    ])
    .then(()=>{
      EngineerOrIntern();
    });
}

init();