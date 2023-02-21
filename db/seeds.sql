INSERT INTO departments (id, department_name)
VALUES (001, "Human Resources"),
       (002, "Sales"),
       (003, "Technology");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Recruiter", 50.000, 001),
       (002, "Sales Representative", 50.000, 002),
       (003, "Junior Developer", 60.000, 003);

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (001, "Tim", "Campbell",  001, 123),
       (002, "Alex", "Waldorf", 002, 123),
       (003, "Ben", "Gallis", 003, 123);