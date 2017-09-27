DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial,
  name varchar(20) NOT NULL,
  password varchar(50) NOT NULL
);
