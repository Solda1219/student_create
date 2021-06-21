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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `states` */

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
  `phone_second` varchar(100) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `students` */

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`name`,`role`,`role_name`,`password`) values 
(1,'admin@admin.com','Saul','[-1]',NULL,'$2a$12$ob115QdRHyg56b1nZQxUNuTHB3o9iXzgGaFgv/SsBxl8Rvq7t09dq');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
