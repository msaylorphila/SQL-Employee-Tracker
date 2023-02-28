// Import and require mysql2
const mysql = require('mysql2');



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'rootR00T!',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

module.exports = {
    db
}