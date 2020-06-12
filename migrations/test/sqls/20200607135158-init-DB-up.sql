CREATE TABLE `ro_animator` (
  `animator_id` int(11) NOT NULL AUTO_INCREMENT,
  `animator_firstname` varchar(45) NOT NULL,
  `animator_lastname` varchar(45) NOT NULL,
  `animator_description` text,
  `animator_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`animator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


CREATE TABLE `ro_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_program` (
  `program_id` int NOT NULL AUTO_INCREMENT,
  `program_title` varchar(45) NOT NULL,
  `program_description` text,
  `program_image` varchar(255) DEFAULT NULL,
  `ro_category_category_id` int NOT NULL,
  PRIMARY KEY (`program_id`,`ro_category_category_id`),
  KEY `fk_ro_program_ro_category1_idx` (`ro_category_category_id`),
  CONSTRAINT `fk_ro_progam_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `ro_category` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



