var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      
      res.send('got messages GET');
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      models.messages.post(req.body).then(() => { res.send('message added'); } );
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {

      res.send('got users GET');
    },
    post: function (req, res) {
      models.users.post(req.body).then(dbResult => {
        console.log('dbResult', JSON.stringify(dbResult));
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

