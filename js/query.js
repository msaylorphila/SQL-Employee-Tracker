const mysql2 = require("mysql2");

class Query {
    constructor (db) {
        this.db = db
        
    }
    viewAllDepts(){
        return this.db.promise().query(`SELECT id AS "Department ID", department_name AS Name FROM departments;`);
    };
    viewAllRoles(){
        return this.db.promise().query(`SELECT roles.id as "Role ID", department_name AS "Department", roles.title AS Title, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id ORDER BY roles.id ASC;`)
    };
    viewAllEmployees(){
        return this.db.promise().query(`SELECT employees.employee_id AS "Employee ID", employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, roles.salary AS Salary FROM employees LEFT OUTER JOIN roles ON employees.role_id = roles.id ORDER BY employees.employee_id ASC;`);
        };
    
    }


module.exports = {
    Query
}