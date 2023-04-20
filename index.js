const fs = require("fs");
const inquirer = require('inquirer');
const axios = require('axios');

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
        name: "projectName"
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
        message: "What command should be run to run tests? ",
        name: "test",
        default: "npm test"
    },
    {
        type: "input",
        message: "What does the user need to know about using the repo? ",
        name: "usage",
        default: "There is not any special Guideline!"
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo? ",
        name: "contributing",
        default: "There is not anyway to contribute in this application!"
    }
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error)=>{
        error ? console.error(error) : console.log("success!");
    });
}

function generateMDContent(response){
    console.log(response)
    let readMeContent = `# ${response.projectName}\n\n## Description\n\n---\n\n`;
    if(response.license !== "NONE"){
        //
    }
    readMeContent += `${response.description}\n\n`;
    readMeContent += `## Table of Contents\n\n* [Description](#description)\n\n* [Installation](#installation)\n\n`;
    readMeContent += `* [Usage](#usage)\n\n* [Credits](#credits)\n\n* [Contributing](#contributing)\n\n`;
    
    readMeContent += `* [Tests](#tests)\n\n* [Questions](#questions)\n\n* [License](#license)\n\n`;
    readMeContent += `## Installation\n\n---\n\nIn order to install this application, use below command :\n\n${response.installation}\n\n`;
    readMeContent += `## Usage\n\n---\n\nHere is the usage guideline :\n\n${response.usage}\n\n`;
    readMeContent += `## Credits\n\n---\n\nMy GitHub Username: ${response.gitHubUsername})\n\n`;
    readMeContent += `[My GitHub URL](https://github.com/${response.gitHubUsername})\n\n`;
    readMeContent += `## Contributing\n\n---\n\nTo contribute in this application:\n\n${response.contributing}\n\n`;
    readMeContent += `## Tests\n\n---\n\nIn order to run the test, use below command :\n\n${response.test}\n\n`;
    readMeContent += `## Questions\n\n---\n\nIf you have any question, you can send me an email to:\n\n`;
    readMeContent += `[My Email Address](mailto:(${response.email}))\n\n`;
    readMeContent += `## License\n\n---\n\n${response.license}\n\n`;
    return readMeContent;
}

function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            console.log(response)
            let mdContent = generateMDContent(response);
            writeToFile(`README-for-${response.gitHubUsername}.md`, mdContent);
        });
}
init();