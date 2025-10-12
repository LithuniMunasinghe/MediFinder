create database healthcare;
use healthcare;
create table doctor
(doctor_id int primary key auto_increment,
doctor_name varchar(45),
speciality varchar(45),
doctor_fee double,
Phone varchar(15),
Email varchar(100));
select * from doctor;
SELECT date_of_Birth FROM doctor;