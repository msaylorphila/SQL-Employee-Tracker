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
      
       return this.db.promise().query(`SELECT e.employee_id,e.first_name,e.last_name,e.role_id, r.title, r.department_id, d.department_name,m.first_name 'Manager First name',m.last_name 'Manager Last name' FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.employee_id;`)
    };
    
    }


module.exports = {
    Query
}