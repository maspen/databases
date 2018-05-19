var db = require('../db');
var underscore = require('underscore');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {
      
    },
    // a function which can be used to insert a message into the database
    post: function (data) {
      console.log(data);
      /*
      { username: 'Valjean',
        message: 'In mercy\'s name, three days is all I need.',
        roomname: 'Hello' }
      */
      let username = data.username;
      if (!username) {
        // return error - username not provided
      }
      // username = underscore.escape(username);
      
      console.log(data.message);
      let message = data.message;
      // don't need to check message since it could be empty
      console.log(message);
      
      let roomname = data.roomname;
      if (!roomname) {
        // return error - room name not provided
      }
      // roomname = underscore.escape(roomname);
    
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
                console.log('userId in INSERT', userId);
                return userId;
              });
            }
            userId = JSON.parse(JSON.stringify(row))[0].id;
            console.log('userId in SELECT', userId);
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
        db.dbConnection.query(`select room.id from room where roomname = '${roomname}'`)
          .then(row => {
            if (row.length === 0) {
            // need to add user & retrieve their id
              return db.dbConnection.query(`INSERT INTO room (roomname) VALUES('${roomname}')`).then(result => {
                roomId = JSON.parse(JSON.stringify(result)).insertId;
                console.log('roomId in INSERT', roomId);
                return roomId;
              });
            }
            roomId = JSON.parse(JSON.stringify(row))[0].id;
            console.log('roomId in SELECT', roomId);
            return roomId;
          })
      );
      
      return Promise.all([getUserIdPromise, roomIdPromise]).then(function(allIds) {
        console.log('userId ' + allIds[0] + ' roomId ' + allIds[1]);
        var userId = allIds[0];
        var roomId = allIds[1];
        console.log(message);
        db.dbConnection.query(`INSERT INTO messages (user_id, room_id, message) 
          VALUES('${userId}','${roomId}','${message}')`);
      });
    }
  },

  users: {
    get: function () {
      
    },
    post: function (data) {
      
      return db.dbConnection.query(`select user.username from user where username = '${data.username}'`)
        .then(row => {
          console.log('row', JSON.stringify(row));        
          if (row.length === 0) {
            return db.dbConnection.query(`INSERT INTO user (username) VALUES('${data.username}')`);        
          }
        });
    }
  }
};

