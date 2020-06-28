use employees_db;

insert into departments(department_name)values("marketing");
insert into departments(department_name)values("sales");
insert into departments(department_name)values("IT");
select * from departments;

insert into roles (title, salary, department_id) values("manager", 54000, 1);
insert into roles (title, salary, department_id) values("Team Lead", 65000, 1);
insert into roles (title, salary, department_id) values("supervisor", 49000, 1);

insert into roles (title, salary, department_id) values("manager", 54000, 2);
insert into roles (title, salary, department_id) values("Team Lead", 65000, 2);
insert into roles (title, salary, department_id) values("supervisor", 49000, 2);

insert into roles (title, salary, department_id) values("manager", 54000, 3);
insert into roles (title, salary, department_id) values("Team Lead", 65000, 3);
insert into roles (title, salary, department_id) values("supervisor", 49000, 3);

select * from roles;

delete from roles where role_id > 9;
drop table employees;


insert into employees(first_name, last_name, role_id, manager_id) values("John", "Doe", 7, 0);
insert into employees(first_name, last_name, role_id, manager_id) values("Allen", "Smith", 4, 0);
insert into employees(first_name, last_name, role_id, manager_id) values("Joe", "Tommy", 1, 0);

select * from employees;
insert into employees(first_name, last_name, role_id, manager_id) values("Hannah", "Jacobson", 2, 1);
insert into employees(first_name, last_name, role_id, manager_id) values("Farada", "Alfaredo", 3, 1);
insert into employees(first_name, last_name, role_id, manager_id) values("Peter", "Kevin", 3, 1);

insert into employees(first_name, last_name, role_id, manager_id) values("Natallie", "Erickson", 5, 2);
insert into employees(first_name, last_name, role_id, manager_id) values("Pasta", "macaroni", 6, 2);
insert into employees(first_name, last_name, role_id, manager_id) values("Donald", "Trump", 5, 2);

insert into employees(first_name, last_name, role_id, manager_id) values("Hans", "Obson", 8, 3);
insert into employees(first_name, last_name, role_id, manager_id) values("Friday", "Pizza", 9, 3);
insert into employees(first_name, last_name, role_id, manager_id) values("Obama", "Bieber", 8, 3);

select employee_id, e.first_name, e.last_name, r.title, d.department_name from employees e,departments d, roles r where e.role_id = r.role_id and r.department_id = d.department_id;

select * from roles;