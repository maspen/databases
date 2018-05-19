var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get().then((data) => {
        res.statusCode = 200;
        res.send(data); 
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {    
      models.messages.post(req.body).then(() => {
        // need to check what is returned from model b/c
        // 1. request could be missing a username
        // 2. request could be missing a room
        res.statusCode = 302;
        res.send('message added'); 
      }).catch((err) => {
        res.statusCode = 400;
        res.send(err.message); 
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get().then(data => {
        res.statusCode = 200;
        res.send(data);
      });
    },
    post: function (req, res) {    
      models.users.post(req.body).then(dbResult => {
        // INSERT user response from db: {"fieldCount":0,"affectedRows":1,"insertId":5,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}   
        res.statusCode = 302; 

        if (dbResult) {
          // NEW user was added
          res.send('user added');
        } else {
          // user exists
          res.send('user already exists');
        }
      });
    }
  }
};

