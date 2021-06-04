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

    //employee dept function

    function getEmpDept() {
      connection.query(`SELECT dept_name FROM drepartment`, function (
        err,
        departments
        ){
      if (err) throw err;
      departmentArray = [];
      for (i = 0, i < departments.lenght; i++) {
        departmentArray.push(departments[i].dept_name);
      }

      });

      //get roles function

      function getEmpRoles() {
        connection.query(`SELECT title FROM role`, function (err, roles) {
          if (err) throw err;
          roleArray = [];
          for (i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
          }
          // console.log(roleArray);
        });
      }

      //managers function

      function getManagers() {
        connection.query(`SELECT employee.last_name FROM employee`, function (
          err,
          managers
        ) {
          if (err) throw err;
          employeeArray = [];
          for (i = 0; i < managers.length; i++) {
            manArray.push(managers[i].last_name);
          }
          // console.log(manArray);
        });
      }

// adding employee function
      function employee() {
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          connection.query("SELECT * FROM employee", function (err, res2) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "first_name",
                  type: "input",
                  message: "What is the employees first name?",
                },
                {
                  name: "last_name",
                  type: "input",
                  message: "What is the employees last name?",
                },
                {
                  name: "roleEmployee",
                  type: "list",
                  message: "What is the employee role?",
                  choices: roleArray,
                },
                {
                  name: "managerEmp",
                  type: "list",
                  message: "Who is the employees Manager?",
                  choices: manArray,
                },
              ])
              .then(function (answer) {
                let roleID;
                for (let r = 0; r < res.length; r++) {
                  if (res[r].title == answer.roleEmployee) {
                    roleID = res[r].role_id;
                  }
                }
                let managerID;
                for (let m = 0; m < res2.length; m++) {
                  if (res2[m].last_name == answer.managerEmp) {
                    managerID = res2[m].employee_id;
                  }
                }



                // after prompts, insert a new item into employee_db from inputs

                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                    manager_id: managerID,
                  },
                  function (err) {
                    if (err) throw err;
                  }
                );
                init();
              });
          });
        });
      }

      connection.query(












