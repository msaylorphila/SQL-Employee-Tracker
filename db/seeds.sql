INSERT INTO departments (id, department_name)
VALUES (001, "Human Resources"),
       (002, "Sales"),
       (003, "Technology");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Recruiter", 50000, 001),
       (002, "Sales Representative", 50000, 002),
       (003, "Junior Developer", 60000, 003),
       (004,'Manager of HR dept',12000,001),
       (005,'Manager of Sales',12000,002),
       (006,'Manager of Technology',121021,003);

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (001, "Margaret", "Cranston",  004, null),
       (002, "Brian", "Walton", 005, null),
       (003, "Jenny", "Gall", 006, null),
       (004, "Tim", "Campbell",  001, 1),
       (005, "Alex", "Waldorf", 002, 2),
       (006, "Ben", "Gallis", 003, 3);



      