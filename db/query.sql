USE employee_tracker;

select * from deaprtments;
select * from roles;
select * from employees;


select e.employee_id,e.first_name,e.last_name,e.role_id, r.title, r.department_id, d.department_name from employees e left join roles r on e.role_id = r.id left join departments d on r.department_id = d.id;


select e.employee_id,e.first_name,e.last_name,e.role_id, r.title, r.department_id, d.department_name,m.first_name 'Manager First name',m.last_name 'Manager Last name' from employees e left join roles r on e.role_id = r.id left join departments d on r.department_id = d.id left join employees m on e.manager_id = m.employee_id;