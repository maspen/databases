var db = require('../db');
var underscore = require('underscore');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {
      // select user.username, room.roomname, messages.message,messages.created_At from messages inner join room on room.id = messages.room_id inner join user on user.id = messages.user_id order by messages.created_At desc;
      return db.dbConnection.query('select user.username, room.roomname, messages.message,messages.created_At from messages inner join room on room.id = messages.room_id inner join user on user.id = messages.user_id order by messages.created_At desc')
        .then(row => {
        // console.log('row', JSON.parse(JSON.stringify(row)));
          return JSON.parse(JSON.stringify(row));
        });
      
      /* sql result via JSON parse/stringify
      [ { username: 'Ryan',
          roomname: 'bar',
          message: 'In mercy\'s name, three days is all I need.',
          created_At: '2018-05-19T19:23:34.000Z' },
        { username: 'Ryan',
          roomname: 'bar',
          message: 'In mercy\'s name, three days is all I need.',
          created_At: '2018-05-19T19:23:04.000Z' },
        { username: 'Ryan',
          roomname: 'bar',
          message: 'In mercy\'s name, three days is all I need.',
          created_At: '2018-05-19T19:20:13.000Z' }, ... ]     
      */
    },
    // a function which can be used to insert a message into the database
    post: function (data) {
      /* message format on client side
      { username: 'Valjean',
        message: 'In mercy\'s name, three days is all I need.',
        roomname: 'Hello' }
      */
      let username = data.username;
      if (!username) {
        // return error - username not provided
        return Promise.reject(new Error('username was not provided'));
      }
      
      let message = data.message;
      // don't need to check message since it could be empty
      
      let roomname = data.roomname;
      if (!roomname) {
        // return error - room name not provided
        return Promise.reject(new Error('roomname was not provided'));
      }
    
      // check if username exists
      //  yes - get id -- row stringified = [{"username":"ValjeanA"}]
      //  no - insert & get id
      var userId;
      var getUserIdPromise = Promise.resolve(
        db.dbConnection.query(`select user.id from user where username = '${username}'`)
          .then(row => {
            if (row.length === 0) {
            // need to add user & retrieve their id
              return db.dbConnection.query(`INSERT INTO user (username) VALUES('${data.username}')`).then(result => {
                userId = JSON.parse(JSON.stringify(result)).insertId;
                return userId;
              });
            }
            userId = JSON.parse(JSON.stringify(row))[0].id;
            return userId;
          })
      );
      
      // check if room exists
      //  yes - get id
      // select room.id from room where roomname = 'test';
      //  no - insert & get id
      // insert into room (roomname) value ('test');
      var roomId;
      var roomIdPromise = Promise.resolve(
        db.dbConnection.query(`select room.id from room where roomname = "${roomname}"`)
          .then(row => {
            if (row.length === 0) {
            // need to add user & retrieve their id
              return db.dbConnection.query(`INSERT INTO room (roomname) VALUES("${roomname}")`).then(result => {
                roomId = JSON.parse(JSON.stringify(result)).insertId;
                return roomId;
              });
            }
            roomId = JSON.parse(JSON.stringify(row))[0].id;
            return roomId;
          })
      );
      
      return Promise.all([getUserIdPromise, roomIdPromise]).then(function(allIds) {
        var userId = allIds[0];
        var roomId = allIds[1];
        db.dbConnection.query(`INSERT INTO messages (user_id, room_id, message) 
          VALUES("${userId}","${roomId}","${message}")`);
      });
    }
  },

  users: {
    get: function () {
      return db.dbConnection.query('select user.username from user')
        .then(row => JSON.parse(JSON.stringify(row)));
    },
    post: function (data) {
      
      return db.dbConnection.query(`select user.username from user where username = '${data.username}'`)
        .then(row => {
          if (row.length === 0) {
            return db.dbConnection.query(`INSERT INTO user (username) VALUES('${data.username}')`);        
          }
        });
    }
  }
};

