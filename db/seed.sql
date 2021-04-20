INSERT into departments (id, name)
VALUES ("1","sales"), ("2", "engineer"), ("3","logistics");

INSERT into role (id, title, salary, department_id)
VALUES("1","Salesperson",65000,"1"), ("2","Senior engineer",150000,"2"), ("3","Junior engineer",75000,"2"),("3","Lead analyst",80000,"3");

INSERT into employee (id, first_name, last_name, role_id)
VALUES("11", "Alex", "Ronald","1"),("22","John","Smith","2"),("33","Ashley","Knocks","3"),("44","Jessica","Doug","3");