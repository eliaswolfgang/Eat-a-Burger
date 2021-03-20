// Import MySQL connection.
const connection = require('./connection.js');

// Helper function for SQL syntax to add question marks (?, ?, ?) in query
const printQuestionMarks = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
  const arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (const key in ob) {
    let value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(`${key}=${value}`);
    }
  }

  // Translate array of strings to a single comma-separated string
  return arr.toString();
};

/* I found the above functions really helpful, so I stole them from the class exercises CatApp! 
This also makes the application much more scalable; if we wanted to add additional columns to the database,
any new queries would still be able to accommodate additional values.
*/

// ORM object with all SQL queries and callbacks
const orm = {
  all(table, fn) {
    const sql = `SELECT * FROM ${table};`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      fn(result);
    });
  },

  create(table, cols, vals, fn) {
    let sql = `INSERT INTO ${table}`;

    sql += ' (';
    sql += cols.toString();
    sql += ') ';
    sql += 'VALUES (';
    sql += printQuestionMarks(vals.length);
    sql += ') ';

    connection.query(sql, vals, (err, result) => {
      if (err) {
        throw err;
      }

      fn(result);
    });
  },
  update(table, colVals, condition, fn) {
    let sql = `UPDATE ${table}`;

    sql += ' SET ';
    sql += objToSql(colVals);
    sql += ' WHERE ';
    sql += condition;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }

      fn(result);
    });
  },
  delete(table, condition, cb) {
    let sql = `DELETE FROM ${table}`;
    sql += ' WHERE ';
    sql += condition;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Export the orm object for the model (burger.js)
module.exports = orm;
