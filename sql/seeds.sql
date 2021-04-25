USE employees_db;

INSERT INTO department (name)
VALUES ("Actor");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Baseball");
INSERT INTO department (name)
VALUES ("Rich Person");

INSERT INTO role (title, salary, department_id)
VALUES ("Actor Lead", 127000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 143000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 177000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Baseball Player", 178000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Baseball Lead", 259000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nate", "Johnson", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brad", "Pitt", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harrison", "Ford", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Redford", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marcia", "Brady", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Greg", "Brady", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "Allen", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Derek", "Jeter", 1, 2);



   