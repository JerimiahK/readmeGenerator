// wrapped the code in a function, called at the bottom of the file.
function init() {

  // imports the required dependencies and the markdown file.
  const fs = require("fs");
  const inquirer = require("inquirer");
  const generateMarkdown = require("./utils/generateMarkdown");
  const path = require("path");
  
  // uses inquirer to prompt the user with questions to populate the README file.
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What would you like the title of your project to be?",
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of your project",
      },
      {
        type: "input",
        name: "installation",
        message: "How do you install this app?",
      },
      {
        type: "input",
        name: "usage",
        message: "How do you use this app?",
      },
      {
        type: "list",
        name: "license",
        message: "Would you like to provide a license??",
        choices: ["MIT", "GNU", "Apache", "No License"],
      },
      {
        type: "confirm",
        name: "confirmContribute",
        message: "Would you like to have people contribute to the app?",
        default: true,
      },
      {
        type: "input",
        name: "contributions",
        message: "Provide instructions for user contributions?",
        when: ({ confirmContribute }) => {
          if (confirmContribute) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "confirmTests",
        message: "Would you like to have people test the app?",
        default: true,
      },
      {
        type: "input",
        name: "tests",
        message: "Please provide instructions for testing?",
        when: ({ confirmTests }) => {
          if (confirmTests) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please provide your email address.",
      },
      {
        type: "input",
        name: "github",
        message: "Please provide your GitHub username.",
      },
      {
        type: "input",
        name: "gitlink",
        message: "Please provide your GitHub link.",
      },
    ])
    // returns the data from the inquire, and uses an arrow function to write the README file.
    .then((response) => {
      fs.writeFileSync(
        // path.join joins all of the key/value pairs in the response object into a string so it is properly injected into the README file.
        path.join("README.md"),
        // calls the function in the markdownGenerator file with the data from the inquire as an argument.
        generateMarkdown(response),
      );
      // messages "Success!" in the console, if the README has been successfully generated.
      console.log("Success!");
    });
}

init();
