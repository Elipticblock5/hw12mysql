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

INSERT INTO role (role_id, title, salary, dept_id)
VALUES (1, "Actor Lead", 127000, 1);
INSERT INTO role (role_id, title, salary, dept_id)
VALUES (2, "Rich Person", 1143000, 2);
INSERT INTO role (role_id, title, salary, dept_id)
VALUES (3. "Software Engineer", 177000, 3);
INSERT INTO role (role_id, title, salary, dept_id)
VALUES (4, "Baseball Player", 178000, 4);
INSERT INTO role (role_id, title, salary, dept_id)
VALUES (5, "Baseball Lead", 259000, 5);

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



   