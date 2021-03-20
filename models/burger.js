// Import the ORM from config
const orm = require('../config/orm.js');
// Each burger method corresponds to the orm method with the correct sql for executing the desired query
const burger = {
  all(cb) {
    orm.all('burgers', (res) => cb(res));
  },
  insert(cols, vals, cb) {
    orm.create('burgers', cols, vals, (res) => cb(res));
  },
  update(colVals, condition, cb) {
    orm.update('burgers', colVals, condition, (res) => cb(res));
  },
  delete(condition, cb) {
    orm.delete('burgers', condition, (res) => cb(res));
  },
};

// Export the database functions for the controller
module.exports = burger;
