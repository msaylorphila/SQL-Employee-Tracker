const { json } = require('express');
const inquirer = require('inquirer');
const { db } = require('../server');
const { Query } = require('./query')

let query = new Query(db)
const list = [{
    type: 'list',
    message: 'Please select one',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],
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
            break;
        case 'Update an employee role':
            updateAnEmployeeRole()
            console.log('employee role updated');
            break;
        case 'Quit':
            process.exit()
            break;
    }
};

function addaDepartment() {
 

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
    query.viewAllDepts()
        .then(results => {
            const dbList = []
            results[0].forEach(element => {
                dbList.push({
                    value: element['Department ID'],
                    name: element.Name
                })
            });

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



function addAnEmployee() {
    query.viewAllEmployees()
        .then(results => {
            const managerList = []
            results[0].forEach(element => {
                if (element.manager_id !== null)
                    managerList.push({
                        value: element.employee_id,
                        name: [element.first_name + " " + element.last_name]

                    })

            })
            query.viewAllRoles()
                .then(results => {
                    const rolesList = []
                    results[0].forEach(element => {
                        rolesList.push({
                            value: element['Role ID'],
                            name: element.Title
                        })
                    });
                    inquirer.prompt(
                        [{
                            type: 'input',
                            message: 'Please respond with a new employee first name to add',
                            name: 'first',
                        },
                        {
                            type: 'input',
                            message: 'Please respond with a new employee last name to add',
                            name: 'last',
                        },
                        {
                            type: 'list',
                            message: 'Please select a role for the new employee',
                            choices: rolesList,
                            name: 'role'
                        },
                        {
                            type: 'list',
                            message: 'Please select the corresponding manager to the role you have selected',
                            choices: managerList,
                            name: 'manager'
                        }
                        ]
                    ).then((response) => {
                        let newEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${response.first}", "${response.last}", "${response.role}", "${response.manager}");`
                        db.promise().query(newEmployee)
                            .then(result => {
                                console.log('New employee added.')
                                init()
                            })
                    })
                })
        })
}


function updateAnEmployeeRole() {
    query.viewAllEmployees()
        .then(results => {
            const employeeList = []
            results[0].forEach(element => {
                employeeList.push({
                    value: element.employee_id,
                    name: [element.first_name + " " + element.last_name]

                })

            })
            query.viewAllRoles()
                .then(results => {
                    const rolesList = []
                    results[0].forEach(element => {
                        rolesList.push({
                            value: element['Role ID'],
                            name: element.Title
                        })
                    });
                    inquirer.prompt(
                        [{
                            type: 'list',
                            message: 'Please select an employee you would like to update',
                            choices: employeeList,
                            name: 'employee'
                        },
                        {
                            type: 'list',
                            message: 'Please select a new role for your employee',
                            choices: rolesList,
                            name: 'role'
                        }]
                    ).then((response) => {
                        db.promise().query(`UPDATE employees SET role_id = ${response.role} WHERE employee_id = ${response.employee}`)
                            .then(result => {
                                console.log('Employee updated.')
                                init()
                            })
                    }
                    )
                })
        })
}
init()
