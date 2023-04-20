const fs = require("fs");
const inquirer = require('inquirer');

const questions = [
    {
        type: "input",
        message: "What is your GitHub username? ",
        name: "gitHubUsername"
    },
    {
        type: "input",
        message: "What is your email address? ",
        name: "email"
    },
    {
        type: "input",
        message: "What is your project's name? ",
        name: "projectName",
        validate: function (input) { 
            return input.length > 0
        }
    },
    {
        type: "input",
        message: "Please write a short description of your project: ",
        name: "description"
    },
    {
        type: "list",
        message: "What kind of license should your project have? ",
        name: "license",
        choices: ["MIT", "APACHE", "ISC", "ECLIPSE", "MOZILLA", "NONE"]
    },
    {
        type: "input",
        message: "What command should be run to install dependencies? ",
        name: "installation",
        default: "npm i"
    },
    {
        type: "input",
        message: "What command should be run to do the tests? ",
        name: "test",
        default: "There is no specific way to test this method!"
    },
    {
        type: "input",
        message: "What does the user need to know about using the repo? ",
        name: "usage",
        default: "There is not any special guideline available!"
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo? ",
        name: "contributing",
        default: "No contribution is allowed at this point!"
    }
];


function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error)=>{
        error ? console.error(error) : console.log("success!");
    });
}

function renderLicenseBadge(license){
    let shieldUrl = `https://img.shields.io/badge/license-`
    if(license === "MIT"){
        return `${shieldUrl}${license}-red`;
    }
    else if(license === "APACHE"){
        return `${shieldUrl}${license}-green`;
    }
    else if(license === "ISC"){
        return `${shieldUrl}${license}-blue`;
    }
    else if (license === "ECLIPSE"){
        return `${shieldUrl}${license}-purple`;
    }
    else if(license === "MOZILLA"){
        return `${shieldUrl}${license}-orange`;
    }
    else{
        return `NONE`;
    }
}

function renderLicenseLink(license){
    if(license !== "NONE"){
        return `https://opensource.org/license/${license}`;
    }
    else{
        return `NONE`;
    }
}

function generateMDContent(response){
    console.log(response)
    let readMeContent = `# ${response.projectName}\n\n`;
    if(response.license !== "NONE"){
        readMeContent += `[![${renderLicenseBadge(response.license)}](${renderLicenseBadge(response.license)})](${renderLicenseLink(response.license)})\n\n<br>\n\n`;
    }
    readMeContent += `## Description\n\n---\n\n${response.description}\n\n<br>\n\n`;
    readMeContent += `## Table of Contents\n\n---\n\n* [Description](#description)\n\n* [Installation](#installation)\n\n`;
 //   readMeContent += `* [Usage](#usage)\n\n* [Credits](#credits)\n\n* [Contributing](#contributing)\n\n`;
    readMeContent += `* [Usage](#usage)\n\n* [Contributing](#contributing)\n\n`;
    readMeContent += `* [Tests](#tests)\n\n* [Questions](#questions)\n\n* [License](#license)\n\n<br>\n\n`;
    readMeContent += `## Installation\n\n---\n\nIn order to install this application, use the below command :\n\n${response.installation}\n\n<br>\n\n`;
    readMeContent += `## Usage\n\n---\n\nHere is the application guideline :\n\n${response.usage}\n\n<br>\n\n`;
 //   readMeContent += `## Credits\n\n---\n\nMy GitHub Username : ${response.gitHubUsername}\n\n`;
 //   readMeContent += `[My GitHub URL](https://github.com/${response.gitHubUsername})\n\n`;
    readMeContent += `## Contributing\n\n---\n\nTo contribute to this application :\n\n${response.contributing}\n\n<br>\n\n`;
    readMeContent += `## Tests\n\n---\n\nIn order to run the test, use below command :\n\n${response.test}\n\n<br>\n\n`;
    readMeContent += `## Questions\n\n---\n\nIf you have any additional questions, you can send me an email to :\n\n`;
    readMeContent += `[My Email Address](mailto:(${response.email}))\n\n`;
    readMeContent += `My GitHub URL is : \n\n[My GitHub URL](https://github.com/${response.gitHubUsername})\n\n<br>\n\n`;
    if(response.license !== "NONE"){
        readMeContent += `## License\n\n---\n\nThis application is under ${response.license} license.\n\n`;
    }
    else{
        readMeContent += `## License\n\n---\n\nThis application does not have any license!\n\n`;
    }
    return readMeContent;
}

function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            console.log(response)
            let mdContent = generateMDContent(response);
            if(response.gitHubUsername !== ""){
                writeToFile(`README-for-${response.gitHubUsername}.md`, mdContent);
            }
            else{
                writeToFile(`NEW-README.md`, mdContent);
            }
        });
}
init();