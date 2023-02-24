const { json } = require('express');
const inquirer = require('inquirer');
const { db } = require('../server');
const { Query } = require('./query')

let query = new Query(db)
const list = [{
    type: 'list',
    message: 'Please select one',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    name: 'selection_list'
}];

function init() {
    inquirer.prompt(list)
        .then(handleResponse)
}

const handleResponse = (response) => {
      switch (response.selection_list) {
        case 'View all departments':
            query.viewAllDepts()
                .then(([results]) => {
                    console.log(`\nDepartments`)
                    console.table(results)
                    init();
                })
            break;
        case 'View all roles':
            query.viewAllRoles()
                .then(([results]) => {
                    console.log(`\nRoles`)
                    console.table(results)
                    init()
                })
            break;
        case 'View all employees':
            query.viewAllEmployees()
                .then(([results]) => {
                    console.log(`\nEmployees`)
                    console.table(results)
                    init()
                })
            break;
        case 'Add a department':
            addaDepartment()
            // init()
            break;
        case 'Add a role':
            addarole();
            break;
        case 'Add an employee':
            addAnEmployee()
            console.log('employee added');
            break;
        case 'Update an employee role':
            console.log('employee role updated');
            break;
    }
};

function addaDepartment() {
    // console.log('hey')
  
    inquirer.prompt(
        {
            type: 'input',
            message: 'Please respond with a new department name to add',
            name: 'department_name',
        }).then((response) => {
            let depName = `INSERT INTO departments (department_name)
        VALUES ("${response.department_name}")`
            db.promise().query(depName)
                .then(result => {
                    console.log('Department Added')
                    init()
                })
        })


};

function addarole() {
  
    // console.log('hey')
    query.viewAllDepts()
        .then(results => {
            const dbList = []
            results[0].forEach(element => {
                dbList.push({
                    value: element['Department ID'],
                    name: element.Name
                })
            });
            console.log(results[0],dbList)

            inquirer.prompt(
                [{
                    type: 'input',
                    message: 'Please respond with a new title to add',
                    name: 'title',
                },
                {
                    type: 'input',
                    message: 'Please respond with a salary to add',
                    name: 'salary',
                },
                {
                    type: 'list',
                    message: 'Please select a department',
                    choices: dbList,
                    name: 'departments',
                }
                ]
            ).then((response) => {
                let newRole = `INSERT INTO roles (title, salary, department_id ) VALUES ("${response.title}",${response.salary},${response.departments});`
                db.promise().query(newRole)
                    .then(result => {
                        console.log('Role added')
                        init()
                    })
            })
        })
}
//.then((results) => {
// inquirer.prompt(
//     {
//         type: 'input',
//         message: 'Please respond with a new title to add',
//         name: 'title',
//     },
//     {
//         type: 'input',
//         message: 'Please respond with a salary to add',
//         name: 'title',
//     },
//     {
//         type: 'list',
//         message: 'Please select a department',
//         choices: [results.id],
//         name: 'title',
//     })})
// ).then((response) => {
//     let newRole = `INSERT INTO roles (title, salary, department_id)
//     VALUES ("Recruiter", 50.000, 001),`
//     db.query(newRole)
// })


// function addAnEmployee() {
//     // console.log('hey')
//     inquirer.prompt(
//         {
//             type: 'input',
//             message: 'Please respond with a new employee first name to add',
//             name: 'empFirst',
//         },
//         {
//             type: 'input',
//             message: 'Please respond with a new employee last name to add',
//             name: 'empLast',
//         }
//     ).then((response) => {
//         let depName = `INSERT INTO departments (department_name)
//         VALUES ("${response.department_prompt}")`
//         db.query(depName)
//     })
// }

init()
