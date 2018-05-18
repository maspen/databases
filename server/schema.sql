DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INTEGER(11) NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  message MEDIUMTEXT NULL,
  created_At TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user (
  id INTEGER NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE room (
  id INTEGER NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE messages ADD FOREIGN KEY (user_id) REFERENCES user (id);
ALTER TABLE messages ADD FOREIGN KEY (room_id) REFERENCES room (id);

-- ---
-- Table Properties
-- ---

ALTER TABLE messages ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE user ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE room ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

