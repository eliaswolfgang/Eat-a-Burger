// Set up MySQL connection.
const mysql = require('mysql');
// And import util to promisify the queries to use async/await syntax
const util = require('util')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  // If you see this, please give me feedback on the best way to secure this password! I've been searching npm packages but don't know which one is the most intuitive to use.
  password: 'ivmysql123',
  database: 'burgers_db',
});

// Connect and log to console
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

connection.query = util.promisify(connection.query);

// Export connection for ORM
module.exports = connection;
