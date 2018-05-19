var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

/*
dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat'
    });
    dbConnection.connect();
*/

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject (err);
        }
        resolve(rows);
      });
    });
  }
  
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) { return reject(err); }
        resolve();
      });
    });
  }
}

var dbConnection = new Database({
  user: 'student',
  password: 'student',
  database: 'chat'
});

module.exports.dbConnection = dbConnection;