/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.17-MariaDB : Database - student_create
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`student_create` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `student_create`;

/*Table structure for table `states` */

DROP TABLE IF EXISTS `states`;

CREATE TABLE `states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_name` varchar(100) NOT NULL,
  `governorate` varchar(100) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

/*Data for the table `states` */

insert  into `states`(`id`,`state_name`,`governorate`) values 
(19,'state_1','gov_1'),
(20,'state_2','gov_2'),
(21,'state_3','gov_3');

/*Table structure for table `students` */

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `school` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `governorate` varchar(100) DEFAULT NULL,
  `institute` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `poster` varchar(100) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `identification` varchar(100) DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `first_installment` int(11) DEFAULT NULL,
  `second_installment` int(11) DEFAULT NULL,
  `third_installment` int(11) DEFAULT NULL,
  `forth_installment` int(11) DEFAULT NULL,
  `remain_amount` int(11) DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `first_ins_date` varchar(20) DEFAULT NULL,
  `first_ins_invoice` int(11) DEFAULT NULL,
  `second_ins_date` varchar(20) DEFAULT NULL,
  `second_ins_invoice` int(11) DEFAULT NULL,
  `third_ins_date` varchar(20) DEFAULT NULL,
  `third_ins_invoice` int(11) DEFAULT NULL,
  `forth_ins_date` varchar(20) DEFAULT NULL,
  `forth_ins_invoice` int(11) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

/*Data for the table `students` */

insert  into `students`(`id`,`state_id`,`name`,`school`,`branch`,`governorate`,`institute`,`phone`,`poster`,`code`,`identification`,`total_amount`,`first_installment`,`second_installment`,`third_installment`,`forth_installment`,`remain_amount`,`notes`,`created_at`,`first_ins_date`,`first_ins_invoice`,`second_ins_date`,`second_ins_invoice`,`third_ins_date`,`third_ins_invoice`,`forth_ins_date`,`forth_ins_invoice`) values 
(28,19,'student_1_gov_1','school1','branch1','gov_1','asdf','asfd','Green Poster','asdfsfd','asfsfd',0,0,0,0,0,0,'','2021-06-18','2021-06-18',0,'2021-06-18',0,'2021-06-18',0,'2021-06-18',0),
(29,19,'student_2_gov_2','shool1','brabch1','gov_1','asdf','sdfsfd','Green Poster','','',0,0,0,0,0,0,'','2021-06-18','2021-06-18',12,'2021-06-18',0,'2021-06-18',0,'2021-06-18',0),
(30,20,'student1_state_2','sholl_state_2','branch2','gov_2','asdfasdf','23234234','Gold Poster','','',0,0,0,0,0,0,'','2021-06-18','2021-06-18',0,'2021-06-18',0,'2021-06-18',0,'2021-06-18',0),
(31,20,'studnet2_state_2','school2','branch3','gov_2','asdfasf','sadf','','','',0,0,0,0,0,0,'','2021-06-18','2021-06-18',0,'2021-06-18',0,'2021-06-18',0,'2021-06-18',0),
(32,21,'student1 in state_3 edited','primary','music','girl ','soud','3234234','Green Poster','','',0,0,0,0,0,0,'','2021-06-19','2021-06-19',0,'2021-06-19',0,'2021-06-19',0,'2021-06-19',0),
(33,19,'student3 in state1','asdfasfdasdf','asfdasdf','asdfasfd','asfasfdasfd','112312','Gold Poster','','asdfasfd',23,0,23,0,0,0,'','2021-06-19','2021-06-11',12,'2021-06-15',0,'2021-06-19',0,'2021-06-19',0);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`name`,`role`,`role_name`,`password`) values 
(1,'admin@admin.com','Saul','[-1]','super','$2a$12$4XUbNDjCFdh1/Uid5m.s0..btqNbKUlmWmXV7iFQts/OWCVHl2AFq'),
(10,'two@role.com','two_role','[19,20]',NULL,'$2a$12$RstQwgDXnM5oW.nRJGWoPetD49dLqbkK1MlpxcmjVMYs/KnWldxBe'),
(11,'state3@admin.com','state_3 admin','[21]',NULL,'$2a$12$ak/dU61qbf0xtOwY3hKRY.ulJV13DCnR3f9qjdzxMsOMGxsI903GK');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
