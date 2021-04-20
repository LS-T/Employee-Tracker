const mysql = require("mysql");
const inquirer = require("inquirer");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to do?",
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
        case "exit":
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewEmployees = () => {
  inquirer
    .prompt({
      name: "whichDepartment",
      type: "list",
      message: "Which department would you like to see the employees for?",
      choices: ["Engineer", "Sales", "Logistics", "exit"],
    })
    .then((answer) => {
      switch (answer.whichDepartment) {
        case "Engineer":
          let query1 =
            "SELECT id, first_name, last_name FROM employee WHERE role_id=?";
          connection.query(query1, ["2"], (err, results) => {
            if (err) throw err;
            results.forEach(({ id, first_name, last_name }) => {
              console.log(
                `id: ${id} || first-name: ${first_name} || last-name: ${last_name}`
              );
            });
            viewEmployees();
          });
          break;
        case "Sales":
          let query2 =
            "SELECT id, first_name, last_name FROM employee WHERE role_id=?";
          connection.query(query2, ["1"], (err, results) => {
            if (err) throw err;
            results.forEach(({ id, first_name, last_name }) => {
              console.log(
                `id: ${id} || first-name: ${first_name} || last-name: ${last_name}`
              );
            });
            viewEmployees();
          });
          break;
        case "Logistics":
          let query3 =
            "SELECT id, first_name, last_name FROM employee WHERE role_id=?";
          connection.query(query3, ["3"], (err, results) => {
            if (err) throw err;
            results.forEach(({ id, first_name, last_name }) => {
              console.log(
                `id: ${id} || first-name: ${first_name} || last-name: ${last_name}`
              );
            });
            viewEmployees();
          });
          break;
        case "exit":
          start();
          break;
        default:
          console.log("something wrong at view employee function");
          break;
      }
    });
};

const viewDepartments = () => {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to view?",
      choices: ["Engineer", "Sales", "Logistics", "exit"],
    })
    .then((answer) => {
      switch (answer.department) {
        case "Engineer":
          let query1 = "SELECT name FROM departments WHERE id=?";
          connection.query(query1, ["2"], (err, results) => {
            if (err) throw err;
            results.forEach(({ name }) => {
              console.log(`name: ${name}`);
            });
          });
          addDe
          break;
        case "Sales":
          let query2 = "SELECT name FROM departments WHERE id=?";
          connection.query(query2, ["1"], (err, results) => {
            if (err) throw err;
            results.forEach(({ id, name }) => {
              console.log(`id: ${id} || name: ${name}`);
            });
          });
          break;
        case "Logistics":
          let query3 = "SELECT id FROM departments WHERE name=?";
          connection.query(query3, ["logistics"], (err, results) => {
            if (err) throw err;
            results.forEach(({ id, name }) => {
              console.log(`id: ${id} || name: ${name}`);
            });
          });
          break;
        case "exit":
          start();
          break;
        default:
          console.log("something wrong at view employee function");
          break;
      }
    });
};

connection.connect((err) => {
  if (err) throw err;
  start();

  console.log("Did I connect to the database?", connection.threadId);
});
