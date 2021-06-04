DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;



CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(45) NULL
 
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  dept_id INT REFERENCES department(dept_id),
  FOREIGN KEY(dept_id) REFERENCES department(dept_id) ON DELETE CASCADE
);



CREATE TABLE employee (
  emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  role_id INT NOT NULL REFERENCES roles(role_id),
  manager_id INT REFERENCES employee(emp_id),
  FOREIGN KEY(role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  FOREIGN KEY(manager_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);