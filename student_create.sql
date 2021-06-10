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
  `students` longtext DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*Data for the table `states` */

insert  into `states`(`id`,`state_name`,`governorate`,`students`) values 
(1,'asdf','asdf','[3,4,6,7,8,9]'),
(2,'asdfs','asdfs','[5]'),
(3,'asds','sdsd','[]'),
(4,'sdss','sss','[]'),
(5,'asssss','ssss','[]'),
(6,'asdfas','asddd','[]'),
(7,'asdfssss','asdf','[]'),
(8,'sdfsdfdf','sdfsdf','[]'),
(9,'sdsdsd','sdsfsdf','[]'),
(10,'new state','governorate name of this state','[]');

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
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `students` */

insert  into `students`(`id`,`state_id`,`name`,`school`,`branch`,`governorate`,`institute`,`phone`,`poster`,`code`,`identification`,`total_amount`,`first_installment`,`second_installment`,`third_installment`,`forth_installment`,`remain_amount`,`notes`) values 
(1,1,'asdf','asdf','asdf','asdf','asdfasfd','asdf','Gold Poster','asdf','asdf',0,0,0,0,0,0,''),
(2,1,'asdfss','asdfsdf','sdfsdf','sdfsdf','sdfsdf','asdfsdf','Green Poster','asdfasdf','asfd',0,0,0,0,0,0,''),
(5,2,'asdfsdfasdfa','asdfsdfsdfsdf','sdfsdfsdf','sdfsdfsdf','sdfsdfsdf','123123123123','Green Poster','asdfasfd','asdfasdfsdf',0,0,0,0,0,0,''),
(7,1,'student in 1','university','geometry','boss','asdfsfd','12312312','Gold Poster','asdf','asdfasdf',23,22,12,1,23,23,''),
(8,1,'studaesdf','moskow','physics','asdfas','asdfasdf','12121232','Green Poster','asf','asdfasdf',23,23,23,0,0,0,'asdf'),
(9,1,'asfdasfdsdfsdf','sdfsdfsdfsdf','sdfsdfsfdsf','sdfsdfsdfs','sdfsfsf','12123232','','asdfasdf','asdfasdf',0,0,0,0,0,0,'');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`name`,`role`,`role_name`,`password`) values 
(1,'admin@admin.com','Saul',1,'admin','$2a$12$4XUbNDjCFdh1/Uid5m.s0..btqNbKUlmWmXV7iFQts/OWCVHl2AFq');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
