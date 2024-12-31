-- Create the database
CREATE DATABASE IF NOT EXISTS products;

-- Use the database
USE products;

-- Create the table for products
CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL
);
