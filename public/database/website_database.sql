CREATE DATABASE club_connect_website_database;

USE club_connect_website_database;

CREATE TABLE Logging_in (
    username VARCHAR(40),
    success BOOLEAN,
    log_time DATE,
    id INT UNSIGNED,
    PRIMARY KEY (id)
);

CREATE TABLE User (
    username VARCHAR(40) UNIQUE,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    pass VARCHAR(120),
    email VARCHAR(120) UNIQUE,
    PRIMARY KEY (username)
);

INSERT INTO User
VALUES ('duckduck', 'george', 'duck', 'Ducks123', 'yassman0603@gmail.com');