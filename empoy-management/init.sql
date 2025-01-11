CREATE DATABASE IF NOT EXISTS ems;

-- Use the database
USE ems;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_id VARCHAR(255) NOT NULL UNIQUE
);
