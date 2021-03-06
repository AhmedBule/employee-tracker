var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "soccer123",
  database: "employees_db"
});
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "userChoice",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add new employees",
        "View Employees",
        "View Department",
        "View Roles",
        "Add Department",
        "Add Roles",
        "Update Employee Roles",
        "EXIT"]
      // "view employees", "update employees",
    })
    .then(function (answer) {
      // based on their answer, either they will add new employees or view it. 
      if (answer.userChoice === "Add new employees") {
        addEmployee();
      }
      else if (answer.userChoice === "View Roles") {
        showRoles();
      } else if (answer.userChoice === "View Department") {
        showDepartments();
      }
      else if (answer.userChoice === "View Employees") {
        showEmployees();
      }
      else if (answer.userChoice === "Add Roles") {
        addRoles();
      }
      else if (answer.userChoice === "Add Department") {
        addDepartment();
      }
      else if (answer.userChoice === "Update Employee Roles") {
        updateEmployeeRoles();
      }

      else {
        connection.end();
        //   if(answer.userChoice === "View Departments") {
        //     showDepartments();

      }
    });
}
// Adding employee

function addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "Enter Employee First name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter Employee Last name?"
    },
    {
      name: "role_id",
      type: "list",
      choices: [2, 3, 5, 6, 8, 9],
      message: "Enter Employee role ID?"
    },
    {
      name: "manager_id",
      type: "list",
      choices: [1, 2, 3],
      message: "Enter Manager's name?"
    }



  ]).then(function (answer) {
    connection.query("insert into employees(first_name, last_name, role_id, manager_id) values(?, ?, ?, ?);",
      [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, response) {
      if (err)
        (
          console.log(err)
        )
      console.log(response)
      start()
    })
  });
}

// Adding roles
function addRoles() {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "enter the title of the employee",

    },
    {
      name: "salary",
      type: "input",
      message: "enter employee salary",

    },
    {
      name: "department_id",
      type: "input",
      message: "enter employee department id",

    }
  ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) values(?, ?, ?);",
        [answer.title, answer.salary, answer.department_id],
        function (err, response) {
          if (err)
            (
              console.log(err)
            )
          console.log(response)
          start()
        });
    })
}

// Adding departments

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "Enter Department name",

      },
    ])
    .then(function (answer) {
      console.log(answer);
      connection.query(
        "INSERT INTO departments (department_name) values(?);",
        [answer.department_name],
        function (err, response) {
          if (err)
            (
              console.log(err)
            )
          console.log(response)
          start()
        });
    })
}

// From here on, we are going to view the roles. 
function showRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// We are going to view the employees
function showEmployees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// Viewing departments
function showDepartments() {
  connection.query("SELECT * FROM Departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Updating Roles

function updateEmployeeRoles() {
  console.log("update employee roles");
  inquirer.prompt([
    {
      name: "employee_id",
      type: "list",
      message: "Choose employee id",
      choices: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

    },
    {
      name: "role_id",
      type: "list",
      message: "Update employee role id",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]

    }
  ])
    .then(function (answer) {
      connection.query(
        "UPDATE employees SET role_id = ? where employee_id = ?;",
        [answer.employee_id, answer.role_id],
        function (err, response) {
          if (err)
            (
              console.log(err)
            )
          console.log(response)
          start()
        });
    })
}