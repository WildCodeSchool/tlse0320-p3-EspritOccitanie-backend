CREATE TABLE `ro_admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_user` varchar(16) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `admin_password` varchar(32) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_animator` (
  `animator_id` int NOT NULL AUTO_INCREMENT,
  `animator_firstname` varchar(45) NOT NULL,
  `animator_lastname` varchar(45) NOT NULL,
  `animator_description` text,
  `animator_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`animator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `ro_animator_has_ro_progam` (
  `ro_animator_animator_id` int NOT NULL,
  `ro_program_program_id` int NOT NULL,
  PRIMARY KEY (`ro_animator_animator_id`,`ro_program_program_id`),
  KEY `fk_ro_animator_has_ro_progam_ro_progam1_idx` (`ro_program_program_id`),
  KEY `fk_ro_animator_has_ro_progam_ro_animator1_idx` (`ro_animator_animator_id`),
  CONSTRAINT `fk_ro_animator_has_ro_progam_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `ro_animator` (`animator_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_ro_animator_has_ro_progam_ro_progam1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `ro_program` (`program_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_planning` (
  `planning_id` int NOT NULL AUTO_INCREMENT,
  `planning_date_start` datetime NOT NULL,
  `planning_date_end` datetime NOT NULL,
  PRIMARY KEY (`planning_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_planning_has_ro_podcast` (
  `ro_planning_planning_id` int NOT NULL,
  `ro_podcast_podcast_id` int NOT NULL,
  PRIMARY KEY (`ro_planning_planning_id`,`ro_podcast_podcast_id`),
  KEY `fk_ro_planning_has_ro_podcast_ro_podcast1_idx` (`ro_podcast_podcast_id`),
  KEY `fk_ro_planning_has_ro_podcast_ro_planning1_idx` (`ro_planning_planning_id`),
  CONSTRAINT `fk_ro_planning_has_ro_podcast_ro_planning1` FOREIGN KEY (`ro_planning_planning_id`) REFERENCES `ro_planning` (`planning_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_ro_planning_has_ro_podcast_ro_podcast1` FOREIGN KEY (`ro_podcast_podcast_id`) REFERENCES `ro_podcast` (`podcast_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_podcast` (
  `podcast_id` int NOT NULL AUTO_INCREMENT,
  `podcast_title` varchar(255) NOT NULL,
  `podcast_duration` varchar(45) NOT NULL,
  `podcast_description` text,
  `podcast_image` varchar(255) DEFAULT NULL,
  `podcast_mp3` varchar(255) DEFAULT NULL,
  `podcast_creation_date` datetime DEFAULT NULL,
  `ro_category_category_id` int NOT NULL,
  PRIMARY KEY (`podcast_id`,`ro_category_category_id`),
  KEY `fk_ro_podcast_ro_category1_idx` (`ro_category_category_id`),
  CONSTRAINT `fk_ro_podcast_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `ro_category` (`category_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_podcast_has_ro_animator` (
  `ro_podcast_podcast_id` int NOT NULL,
  `ro_animator_animator_id` int NOT NULL,
  PRIMARY KEY (`ro_podcast_podcast_id`,`ro_animator_animator_id`),
  KEY `fk_ro_podcast_has_ro_animator_ro_animator1_idx` (`ro_animator_animator_id`),
  KEY `fk_ro_podcast_has_ro_animator_ro_podcast1_idx` (`ro_podcast_podcast_id`),
  CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `ro_animator` (`animator_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_podcast1` FOREIGN KEY (`ro_podcast_podcast_id`) REFERENCES `ro_podcast` (`podcast_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_podcast_has_ro_tag` (
  `ro_podcast_podcast_id` int NOT NULL,
  `ro_podcast_ro_category_category_id` int NOT NULL,
  `ro_tag_tag_id` int NOT NULL,
  PRIMARY KEY (`ro_podcast_podcast_id`,`ro_podcast_ro_category_category_id`,`ro_tag_tag_id`),
  KEY `fk_ro_podcast_has_ro_tag_ro_tag1_idx` (`ro_tag_tag_id`),
  KEY `fk_ro_podcast_has_ro_tag_ro_podcast1_idx` (`ro_podcast_podcast_id`,`ro_podcast_ro_category_category_id`),
  CONSTRAINT `fk_ro_podcast_has_ro_tag_ro_podcast1` FOREIGN KEY (`ro_podcast_podcast_id`, `ro_podcast_ro_category_category_id`) REFERENCES `ro_podcast` (`podcast_id`, `ro_category_category_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_ro_podcast_has_ro_tag_ro_tag1` FOREIGN KEY (`ro_tag_tag_id`) REFERENCES `ro_tag` (`tag_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_program` (
  `program_id` int NOT NULL AUTO_INCREMENT,
  `program_title` varchar(45) NOT NULL,
  `program_description` text,
  `program_image` varchar(255) DEFAULT NULL,
  `ro_category_category_id` int NOT NULL,
  PRIMARY KEY (`program_id`,`ro_category_category_id`),
  KEY `fk_ro_program_ro_category1_idx` (`ro_category_category_id`),
  CONSTRAINT `fk_ro_progam_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `ro_category` (`category_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_program_has_ro_planning` (
  `ro_program_program_id` int NOT NULL,
  `ro_planning_planning_id` int NOT NULL,
  PRIMARY KEY (`ro_program_program_id`,`ro_planning_planning_id`),
  KEY `fk_ro_progam_has_ro_planning_ro_planning1_idx` (`ro_planning_planning_id`),
  KEY `fk_ro_progam_has_ro_planning_ro_progam_idx` (`ro_program_program_id`),
  CONSTRAINT `fk_ro_progam_has_ro_planning_ro_planning1` FOREIGN KEY (`ro_planning_planning_id`) REFERENCES `ro_planning` (`planning_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_ro_progam_has_ro_planning_ro_progam` FOREIGN KEY (`ro_program_program_id`) REFERENCES `ro_program` (`program_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ro_tag_has_ro_program` (
  `ro_tag_tag_id` int NOT NULL,
  `ro_program_program_id` int NOT NULL,
  `ro_program_ro_category_category_id` int NOT NULL,
  PRIMARY KEY (`ro_tag_tag_id`,`ro_program_program_id`,`ro_program_ro_category_category_id`),
  KEY `fk_ro_tag_has_ro_progam_ro_progam1_idx` (`ro_program_program_id`,`ro_program_ro_category_category_id`),
  KEY `fk_ro_tag_has_ro_progam_ro_tag1_idx` (`ro_tag_tag_id`),
  CONSTRAINT `fk_ro_tag_has_ro_progam_ro_progam1` FOREIGN KEY (`ro_program_program_id`, `ro_program_ro_category_category_id`) REFERENCES `ro_program` (`program_id`, `ro_category_category_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_ro_tag_has_ro_progam_ro_tag1` FOREIGN KEY (`ro_tag_tag_id`) REFERENCES `ro_tag` (`tag_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;