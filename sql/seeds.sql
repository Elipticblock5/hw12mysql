USE employees_db;


-- Department Values--
INSERT INTO department (dept_Id , dept_name)
VALUES (1, "Actor");
INSERT INTO department (dept_Id , dept_name)
VALUES (2, "Engineering");
INSERT INTO department (dept_Id , dept_name)
VALUES (3, "Baseball");
INSERT INTO department (dept_Id , dept_name)
VALUES (4, "Rich Person");

--roles--

INSERT INTO roles (title, salary, dept_id)
VALUES ("Actor Lead", 127000, 1);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Rich Person", 1143000, 4);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Software Engineer", 177000, 2);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Baseball Player", 178000, 3);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Baseball Lead", 259000, 3);

--employes

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Nate", "Johnson", 3, null);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Brad", "Pitt", 1, 1);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Harrison", "Ford", 3, null);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Robert", "Redford", 4, 3);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Bill", "Gates", 2, null);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (6, "Greg", "Brady", 2, null);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Nolan", "Ryan", 4, 7);
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (8,"Derek", "Jeter", 5, 2);



   