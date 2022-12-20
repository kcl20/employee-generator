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
  ] 
;

var interns = [
    {
        name: '',
        employeeID: '',
        email: '',
        school: '',
    }
];

var managerCard = '';
var engineersContent =  ``;
var internsContent =  ``;



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
        generateManagerCard(data);
      });
}

function generateManagerCard() {
    managerCard = `
  <div class="manager card">
  <h2>${manager.name}</h2>
  <h3>Manager</h3>
  <p>Employee ID: ${manager.employeeID}</p>
  <p>Email: ${manager.email}</p>
  <p>Office Number: ${manager.officeNumber}</p>
</div>`
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
    .then((data)=>{
      engineers.push(data);
      console.log(engineers);
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
    .then((data)=>{
      interns.push(data);
      console.log(interns);
      EngineerOrIntern();
    });
}

function generateHTML() {

  console.log("generating html");
  console.log(engineers);
  console.log(engineers.length);
  generateEngineers(engineers);
  console.log(interns);
  console.log(interns.length);
  generateInterns(interns);

  fs.writeFile("index.html", employeeProfilePageHeader + managerCard + engineersContent + internsContent + employeeProfilePageFooter, (err) =>
  err ? console.error(err) : console.log('Success!')
  );
  

}

var employeeProfilePageHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Team Profile Generator</title>
    <link rel="stylesheet" type="text/css" href="./dist/style.css" />

</head>
<body>
    <header>
        <h1>Team Profile Generator</h1>
    </header>
    <main>    
        ` 

function generateEngineers() {
  
  for (var i = 1; i < engineers.length; i++) {
        engineersContent += 
        `<div class="engineer card">
        <h2>${engineers[i].name}</h2>
        <h3>Engineer</h3>
        <p>Employee ID: ${engineers[i].employeeID}</p>
        <p>Email: ${engineers[i].email}</p>
        <p>GitHub: ${engineers[i].github}</p>
        </div>`}
}

  
function generateInterns() {
  internsContent += ``

  for (var i = 1; i < interns.length; i++) {
    internsContent += 
    `<div class="intern card">
    <h2>${interns[i].name}</h2>
    <h3>Intern</h3>
    <p>Employee ID: ${interns[i].employeeID}</p>
    <p>Email: ${interns[i].email}</p>
    <p>School: ${interns[i].school}</p>
    </div>`}

}

var employeeProfilePageFooter = 
  `</main>
  </body>
  </html>
    `


init();