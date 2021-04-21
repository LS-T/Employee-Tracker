// Dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

// Create connection to mySQL database
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// start function to ask the user what they would like to do next?
const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: " What would you like to do?",
      choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Update employee roles",
        "exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View employees":
          viewEmployees();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Update employee roles":
          updateEmployeeRole();
          break;
        case "exit":
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// function to view list of  current employees
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    res.map((employee) => {
      console.log(employee.id, employee.first_name, employee.last_name);
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });
    start();
  });
};
// function to view list of current departments 
const viewDepartments = () => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    res.map((department) => {
      console.log(department.name);
      return `${department.name}`;
    });
    start();
  });
};

// function to add department to the table departments 
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What would you like to name the new department?",
      },
      {
        name: "departmentID",
        type: "input",
        message: "What would you like the department ID to be?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.departmentName,
          id: answer.departmentID,
        },
        (err) => {
          if (err) throw err;
          console.log("success");
        }
      );
      start();
    });
};

// function to update employee role to a new role 
const updateEmployeeRole = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    let employeeData = res.map((employee) => {
      console.log(employee.id, employee.first_name, employee.last_name);
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });
    inquirer
      .prompt({
        name: "employeeID",
        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeData,
      })
      .then((answer) => {
        connection.query("SELECT * FROM role", (err, res) => {
          if (err) throw err;
            //  set variable roleData to hold mapped results
          let roleData = res.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          inquirer
            .prompt({
              name: "whichRole",
              type: "list",
              message: "Which role would you like to change to?",
              choices: roleData,
            })
            .then((answer2) => {
              connection.query(
                "UPDATE employee SET role_id =? WHERE id =?",
                [answer2.whichRole, answer.employeeID],
                (err, res) => {
                  if (err) throw err;
                  console.log(res);
                }
              );
            });
        });
      });
  });
};

// setup connection to mySQL database
connection.connect((err) => {
  if (err) throw err;
  start();

  console.log("Did I connect to the database?", connection.threadId);
});
