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
      console.log("Completed, generating HTML.")
      generateHTML();
    }
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

function generateHTML() {

  fs.writeFile("index.html", employeeProfilePageContent, (err) =>
  err ? console.error(err) : console.log('Success!')
  );
  

}

var employeeProfilePageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Team Profile Generator</title>
</head>
<body>
    <header>
        <h1>Team Profile Generator</h1>
    </header>
    <main>
        <div class="manager">
            <h2>${manager.name}</h2>
            <h3>Manager</h3>
            <p>Employee ID: ${manager.employeeID}</p>
            <p>Email: ${manager.email}</p>
            <p>Office Number: ${manager.officeNumber}</p>
        </div>
        
        <div class="engineer">`
        
        for (var i = 0; i < engineers.length; i++) {
            employeeProfilePageContent += `
            <h2>${engineers[i].name}</h2>
            <h3>Engineer</h3>
            <p>Employee ID: ${engineers[i].employeeID}</p>
            <p>Email: ${engineers[i].email}</p>
            <p>GitHub: ${engineers[i].github}</p>`}
      `</div>
      
      <div class="intern">`
      
       for (var i = 0; i < interns.length; i++) {
        employeeProfilePageContent += `
        <h2>${interns[i].name}</h2>
        <h3>Intern</h3>
        <p>Employee ID: ${interns[i].employeeID}</p>
        <p>Email: ${interns[i].email}</p>
        <p>School: ${interns[i].school}</p>`}
        `</div>
    </main>
    </body>
    </html>`


init();