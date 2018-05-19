var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {},
    post: function (data) {
      
      // db.dbConnection.connect()
      db.dbConnection.query(`select user.username from user where username = '${data.username}'`)
      .then(row => {
        if (row.length === 0) {
          return db.dbConnection.query(`INSERT INTO user (username) VALUES('${data.username}')`);
        }
      })
      
      
      
      
      
      
      
      
//       db.dbConnection.connect();
// // console.log('----------- models/post/data', data);

// //       // need to check if user is already in 'users' table
// //       db.dbConnection.query(`select user.username from user where username = '${data.username}'`, function (err, rows, fields) {
// //         if(err) console.log('err', err);
// //         if(rows) { console.log('rows', rows);
// //           // rows [ RowDataPacket { username: 'matt' } ] // matt exists
// //           // rows [] // for non existant
// //           if (rows.length === 0) {
// //             db.dbConnection.query(`INSERT INTO user (username) VALUES('${data.username}')`, function (err, rows, fields) {
// //               if (err) throw err

// //               console.log(`inserted ${data.username} into table user`);
// //               // db.dbConnection.end();
// //             });
// //           }
// //         }
// //       });

//       var query = db.dbConnection.query(`select user.username from user where username = '${data.username}'`);
//       query
//       .on('error', function(err) {
//         // Handle error, an 'end' event will be emitted after this as well
//       })
//       .on('fields', function(fields) {
//         // the field packets for the rows to follow
//       })
//       .on('result', function(row) {
//         // Pausing the connnection is useful if your processing involves I/O
//         db.dbConnection.pause();
     
//         // var processRow (row, function() {
//           if(row.length === 0) {
//             db.dbConnection.query(`INSERT INTO user (username) VALUES('${data.username}')`, function (err, rows, fields) {
//               if (err) throw err

//               console.log(`inserted ${data.username} into table user`);
//               db.dbConnection.resume();
//             });
//           }
//         // });
//       })
//       .on('end', function() {
//         // all rows have been received
//         db.dbConnection.end();
//       });
    }
  }
};

