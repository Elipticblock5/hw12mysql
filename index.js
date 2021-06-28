// packages needed

const mysql = require("mysql2");
//const express = require("express");
const inquirer = require("inquirer");
const cTable = require('console.table');

//const app = express();


let manArray = [];
let departmentArray = [];
let employeeArray = [];
let roleArray = [];

//express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());


//connection information, not workign, am working with askBCS to assist
let mySqlConnection = mysql.createConnection({
  host: "localhost",
  //port: 3301,
  user: "root",
  password: "lassyfenn",
  database: "employees_db"
});

mySqlConnection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Nate you are Connected to the MySQL server employees_db.');
  initialPrompt();
});

//askBCS ticket assistance
const menuChoices = {
  type: "list",
  name: "firstChoice",
  message: "Please choose from the following.",
  choices: [
    "add an employee",
    "add a role",
    "add a department",
    "view all of the employees",
    "view the employees by their role",
    "view all employees by department",
    "view all roles",
    "view all depts",
    "update an employee role",
    "Exit",
  ],
};











// connection to servers
//created earlier, help with askBCS ticket

/* mySqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("\n Welcome to the Database \n");
    
    initialPrompt();
  });
   */


// user propmts for questions. 
function initialPrompt() {
  inquirer.prompt(menuChoices).then((response) => {
    switch (response.firstChoice) {
      case "add an employee":
        addEmployee();
        break;
      case "add a role":
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
        mySqlConnection.end();
        break;
      default:
        mySqlConnection.end();
    }

  });
}


//askBCS ticket 70351
//initialPrompt();


// fill arrays with data

/* getEmpDept();
getEmpRoles();
getManagers(); */

//employee dept function

function getEmpDept() {
  mySqlConnection.query(`SELECT dept_name FROM department`, function (
    err,
    department
  ) {
    if (err) throw err;
    departmentArray = [];
    for (i = 0; i < department.lenght; i++) {
      departmentArray.push(department[i].dept_name);
    }
  }
  )
};

//get roles function

function getEmpRoles() {
  mySqlConnection.query(`SELECT title FROM roles`, function (err, roles) {
    if (err) throw err;
    roleArray = [];
    for (i = 0; i < roles.length; i++) {
      roleArray.push(roles[i].title);
    }
    console.log(roleArray);
  });
}

//managers function

function getManagers() {
  mySqlConnection.query(`SELECT employee.last_name FROM employee`, function (
    err,
    managers
  ) {
    if (err) throw err;
    employeeArray = [];
    for (i = 0; i < managers.length; i++) {
      manArray.push(managers[i].last_name);
    }
    console.log(manArray);
  });
}

// adding employee function
function addEmployee() {
  mySqlConnection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    mySqlConnection.query("SELECT * FROM employee", function (err, res2) {
      if (err) throw err;

      //prompts for data input
      inquirer.prompt([
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
          choices: [
            "Software Engineer",
            "Actor Lead",
            "Baseball Player",
            "Rich Person",
            "Baseball Lead"

          ]
        },
        {
          name: "managerEmp",
          type: "list",
          message: "Who is the employees Manager?",
          choices: [
            "Robert Redford",
            "Nolan Ryan",
            "Derek Jeter",
            "Brad Pitt"
          ]
        },
      ])

        // promis return, returning as roleID and ManagerID for rest of functions.

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

          mySqlConnection.query(
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
          initialPrompt();
        });
    });
  });
}

//adding role logic filling new role with data

function addRole() {
  mySqlConnection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What role does this employee fill?",
        },
        {
          name: "salary",
          type: "input",
          message: "How much is employee's salaray?",
          default: "0.00",
        },
        {
          name: "deptName",
          type: "list",
          message: "what is e empoloyees current department?",
          choices: departmentArray,
        },
      ])
      .then(function (answer) {
        //sets iD for future us
        let deptID;
        for (let d = 0; d < res.length; d++) {
          if (res[d].department_name == answer.deptName) {
            deptID = res[d].dept_id;
          }
        }

        mySqlConnection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            dept_id: deptID,
          },
          function (err) {
            if (err) throw err;
          }
        );
        initialPrompt();
      });
  });
}


// Adding department function to add dept.


function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "In what department is the employee in?",
      },
    ])
    .then(function (answer) {

      mySqlConnection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.department,
        },
        function (err) {
          if (err) throw err;
        }
      );
      initialPrompt();
    });
}


// function for viewing employees by their department


function viewByDept() {
  mySqlConnection.query(
    `SELECT employee.emp_id, employee.first_name, employee.last_name, department.dept_name FROM employee 
  LEFT JOIN roles ON employee.role_id = roles.role_id
  LEFT JOIN department ON roles.dept_id = department.dept_id 
  ORDER BY department.dept_name`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      initialPrompt();
    }
  );
}

//function to view by employee role

function viewByRole() {
  mySqlConnection.query(
    `SELECT employee.emp_id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.role_id
    LEFT JOIN department ON roles.dept_id = department.dept_id 
    ORDER BY roles.title`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      initialPrompt();
    }
  );
}

//view roles of all kinds

function viewRoles() {
  mySqlConnection.query(`SELECT * FROM roles`, function (err, data) {
    if (err) throw err;
    console.table(data);
    initialPrompt();
  });
}

//view all Depts.

function viewDept() {
  mySqlConnection.query(`SELECT * FROM department`, function (err, data) {
    if (err) throw err;
    console.log({
      err, data
    })
    console.table(data);
    initialPrompt();
  });
}

// show all employees


function viewEmp() {
  mySqlConnection.query(
    `SELECT employee.emp_id, employee.first_name, employee.last_name, roles.title,
  department.dept_name AS department,roles.salary,CONCAT(a.first_name, " ", a.last_name) AS manager
  FROM employee
  LEFT JOIN roles ON employee.role_id = roles.role_id
  LEFT JOIN department ON roles.dept_id = department.dept_id
  LEFT JOIN employee a ON a.emp_id = employee.manager_id`,
    function (err, data) {
      //console.log({
        //err, data
     // })
      if (err) throw err;
      console.table(data);
      initialPrompt();
    }
  );
}
function allRoles(){
  mySqlConnection.query(
  `SELECT concat(roles.title, ' ' ,  roles.title) AS Title FROM roles`,
  function (err, roles) {
    if (err) throw err;
    rolesArray = [];

  })
}


//employee update
function updateEmpRole() {
  mySqlConnection.query(
    `SELECT concat(employee.first_name, ' ' ,  employee.last_name) AS Name FROM employee`,
    function (err, employees) {
      if (err) throw err;
      employeeArray = [];

    
     
      for (i = 0; i < employees.length; i++) {
        employeeArray.push(employees[i].Name);
        //console.log(response)
        console.log(roleArray)
      }
    
      
      let roles = allRoles
     
     for (i = 0; i < roles.length; i++) {
        roleArray.push(roles[i].title);
        if (err) throw err;
      roleArray = [];
        
        


        //console.log(response)
        console.log(roleArray)
     }


      mySqlConnection.query("SELECT * FROM roles", function (err, res2) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "empPick",
              type: "list",
              message: "What is the name of the employee you want to update?",
              choices: employeeArray,
            },
            {
              name: "rolePick",
              type: "list",
              message: "State the role of the new employee?",
              choices: roleArray,
            },
          ])
          .then(function (answer) {
            let roleID;
            for (let r = 0; r < res2.length; r++) {
              if (res2[r].title == answer.rolePick) {
                roleID = res2[r].role_id;
              }
            }
            // takes data from above propmts and fills db

            mySqlConnection.query(
              `UPDATE employee SET role_id = ? WHERE emp_id = (SELECT emp_id FROM(SELECT emp_id FROM employee WHERE CONCAT(first_name," ",last_name) = ?)AS NAME)`,
              [roleID, answer.empPick],
              function (err) {
                if (err) throw err;
              }
            );
            initialPrompt();
          });
      });
    }
  );
}













