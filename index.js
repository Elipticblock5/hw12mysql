// packages needed

const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


//connection information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "lassyfenn",
  database: "employees_db"
});

// connection to servers
connection.connect(function (err) {
  if (err) throw err;
  // starts questions if connection
  initialPrompt();
});

// user propmts for questions. 
function initialPrompt() {


  // inquirer questions 

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "What funciton would you like to do today?",
      choices: [
        "View the Employees",
        "View the Employees by their Department",
        "Add a New Employee",
        "Remove an Existing Employee",
        "Update the Employee Role",
        "Add a new Employee Role",
        "End"]
    })

    //List of funcitons for assigment add/remove/udpate

    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          showEmployee();
          break;
        case "View Employees by Department":
          viewByDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employees":
          removeEmployees();
          break;
        case "Update Employee Role":
          employeeRoleUpdate();
          break;
        case "Add Role":
          addRole();
          break;
        case "End":
          connection.end();
          break;
      }
    });
}










