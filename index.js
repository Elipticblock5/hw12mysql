// packages needed

const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

let manArray = [];
let departmentArray = [];
let employeeArray = [];
let roleArray = [];


//connection information
const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "lassyfenn",
  database: "employees_db"
});

// connection to servers
connection.connect(function (err) {
  if (err) throw err;
  console.log("\n Welcome to the Database \n");
  // starts questions if connection
  initialPrompt();
});

// user propmts for questions. 
function initialPrompt() {


  // inquirer questions 

  function init() {
    inquirer.prompt(startMenu).then((response) => {
      switch (response.firstOption) {
        case "add an employee":
          addEmployee();
          break;
        case "add a roll":
          addRole();
          break;
        case "add a department":
          addDepartment();
          break;
        case "view all of the employees":
          viewEmp();
          break;
        case "view the employees by their role":
          viewByRole();
          break;
        case "view all employees by department":
          viewByDept();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all depts":
          viewDept();
          break;
        case "update an employee role":
          updateEmpRole();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });


    

    // fill arrays with data

    getEmpDept();
    getEmpRoles();
    getManagers();
    









