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
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error)=>{
        error ? console.error(error) : console.log("success!");
    });
}

function generateMDContent(response){
    console.log(response)
    let readMeContent = `# ${response.projectName}\n\n## Description\n\n---\n\n${response.description}\n\n`;
    readMeContent += `## Table of Contents\n\n* [Description](#description)\n\n* [Installation](#installation)\n\n`;
    readMeContent += `* [Usage](#usage)\n\n* [Credits](#credits)\n\n* [Contributing](#contributing)\n\n`;
    if(response.license !== "NONE"){
        readMeContent += `* [Tests](#tests)\n\n* [Questions](#questions)\n\n* [License](#license)\n\n`;
    }
    else{
        readMeContent += `* [Tests](#tests)\n\n* [Questions](#questions)\n\n`; 
    }
    readMeContent += `## Installation\n\n---\n\nIn order to install this application, use below command:\n\n${response.installation}\n\n`;
    readMeContent += `## Usage\n\n---\n\n`;
    readMeContent += `## Credits\n\n---\n\n`;
    readMeContent += `## Contributing\n\n---\n\n`;
    readMeContent += `## Tests\n\n---\n\n`;
    readMeContent += `## Questions\n\n---\n\n`;
    if(response.license !== "NONE"){
        readMeContent += `## License\n\n---\n\n${response.license}\n\n`;
    }
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