/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat',
      multipleStatements: true
    });
    dbConnection.connect();

    //       var tablenameMessages = "messages"; // TODO: fill this out
    //       var tablenameMessages = "messages";
    // var tablenameMessages = "messages";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0');
    dbConnection.query('truncate user');
    dbConnection.query('truncate room');
    dbConnection.query('truncate messages');
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 1', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);
          

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var json = {
      username: 'Joe',
      message: 'Men like you can never change!',
      roomname: 'main'
    };
    
    var queryString = `INSERT INTO room (roomname) VALUES("${json.roomname}");INSERT INTO user (username) VALUES("${json.username}"); INSERT INTO messages (user_id, room_id, message) VALUES(1, 1, "${json.message}");`;
    var queryArgs = [];

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        console.log(body);
        var messageLog = JSON.parse(body);
        expect(messageLog[0].message).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });
});
