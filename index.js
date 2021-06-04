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
      for (i = 0, i < departments.lenght; i++); {
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
      function addEmployee() {
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

      //adding role logic filling new role with data

      function addRole() {
        connection.query("SELECT * FROM department", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "title",
                type: "input",
                message: "What is employees role title?",
              },
              {
                name: "salary",
                type: "input",
                message: "What does this employee get paid?",
                default: "0.00",
              },
              {
                name: "deptName",
                type: "list",
                message: "What department is employee in?",
                choices: departmentArray,
              },
            ])
            .then(function (answer) {
              
              let deptID;
              for (let d = 0; d < res.length; d++) {
                if (res[d].department_name == answer.deptName) {
                  deptID = res[d].dept_id;
                }
              }
             
              connection.query(
                "INSERT INTO role SET ?",
                {
                  title: answer.title,
                  salary: answer.salary,
                  dept_id: deptID,
                },
                function (err) {
                  if (err) throw err;
                }
              );
              init();
            });
        });
      }


      // Adding department 


      function addDepartment() {
        inquirer
          .prompt([
            {
              name: "department",
              type: "input",
              message: "What is the employees department?",
            },
          ])
          .then(function (answer) {
            
            connection.query(
              "INSERT INTO department SET ?",
              {
                dept_name: answer.department,
              },
              function (err) {
                if (err) throw err;
              }
            );
            init();
          });
      }


      // function for viewing employees by their department

      
function viewByDept() {
  connection.query(
    `SELECT employee.emp_id, employee.first_name, employee.last_name, department.dept_name FROM employee 
  LEFT JOIN role ON employee.role_id = role.role_id
  LEFT JOIN department ON role.dept_id = department.dept_id 
  ORDER BY department.dept_name`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

 //function to view by employee role

 function viewByRole() {
  connection.query(
    `SELECT employee.emp_id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee 
    LEFT JOIN role ON employee.role_id = role.role_id
    LEFT JOIN department ON role.dept_id = department.dept_id 
    ORDER BY role.title`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

//view roles of all kinds

function viewRoles() {
  connection.query(`SELECT * FROM role`, function (err, data) {
    if (err) throw err;
    console.table(data);
    init();
  });
}

//view all Depts.

function viewDept() {
  connection.query(`SELECT * FROM department`, function (err, data) {
    if (err) throw err;
    console.table(data);
    init();
  });
}

// show all employees

// View all employees
function viewEmp() {
  connection.query(
    `SELECT employee.emp_id, employee.first_name, employee.last_name, role.title,
  department.dept_name AS department,role.salary,CONCAT(a.first_name, " ", a.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.role_id
  LEFT JOIN department ON role.dept_id = department.dept_id
  LEFT JOIN employee a ON a.emp_id = employee.manager_id`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

//employee update
function updateEmpRole() {
  connection.query(
    `SELECT concat(employee.first_name, ' ' ,  employee.last_name) AS Name FROM employee`,
    function (err, employees) {
      if (err) throw err;
      emplArr = [];
      for (i = 0; i < employees.length; i++) {
        emplArr.push(employees[i].Name);
      }
      connection.query("SELECT * FROM role", function (err, res2) {
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
              message: "State the rold of the new employee?",
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
            // when finished prompting, update the db with that info
            connection.query(
              `UPDATE employee SET role_id = ? WHERE emp_id = (SELECT emp_id FROM(SELECT emp_id FROM employee WHERE CONCAT(first_name," ",last_name) = ?)AS NAME)`,
              [roleID, answer.empPick],
              function (err) {
                if (err) throw err;
              }
            );
            init();
          });
      });
    }
  );
}
    
 











