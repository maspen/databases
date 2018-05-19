npm install
npm install -g nodemon

run (root level)
nodemon ./server/app.js

need underscore for escaping message text (eg 's);
npm install --save underscore

login

mysql -u student -p
- pass: student

fixing 'lint' issues:
eslint * --fix

show databases;

create database db;
use db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  subject VARCHAR(45) DEFAULT NULL,
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  description VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB

INSERT INTO tasks (subject,start_date, end_date, description) VALUES('tests', DATE '2018-05-14', DATE '2018-05-16','Finish the tests');

INSERT INTO tasks (subject,start_date, end_date, description) VALUES('tests2', DATE '2018-05-15', DATE '2018-05-16','Finish the tests2');

UPDATE tasks SET start_date = (DATE '2018-05-13'), description = 'Pause the test2' WHERE id = 1;

exit sql prompt;
> exit;

stop the server;
mysql.server stop

SQL using WWW SQL Designer;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
-- contains all the messages from the chat application
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NOT NULL DEFAULT NULL,
  `room_id` INTEGER NOT NULL DEFAULT NULL,
  `message` MEDIUMTEXT NULL DEFAULT NULL,
  `created_At` TIMESTAMP NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
) COMMENT 'contains all the messages from the chat application';

-- ---
-- Table 'user'
-- user who writes messages
-- ---

DROP TABLE IF EXISTS `user`;
    
CREATE TABLE `user` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(50) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
) COMMENT 'user who writes messages';

-- ---
-- Table 'room'
-- room that holds messages
-- ---

DROP TABLE IF EXISTS `room`;
    
CREATE TABLE `room` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `room_name` VARCHAR(50) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
) COMMENT 'room that holds messages';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (user_id) REFERENCES `user` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `room` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `room` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`user_id`,`room_id`,`message`,`created_At`) VALUES
-- ('','','','','');
-- INSERT INTO `user` (`id`,`user_name`) VALUES
-- ('','');
-- INSERT INTO `room` (`id`,`room_name`) VALUES
-- ('','');

* message

method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          "username": "Valjean",
          "message": "In mercy's name, three days is all I need.",
          "roomname": "Hello"
        }

* room

* user


* loading sql file to running mysql:
shell> mysql < server/schema.sql;

* postman
- post to user -- adding a new user
POST
localhost:3000/classes/users
application/json
{ "username": "Valjean" }




