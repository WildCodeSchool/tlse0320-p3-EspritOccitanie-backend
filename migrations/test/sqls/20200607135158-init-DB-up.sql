CREATE TABLE `ro_animator` (
  `animator_id` int(11) NOT NULL AUTO_INCREMENT,
  `animator_firstname` varchar(45) NOT NULL,
  `animator_lastname` varchar(45) NOT NULL,
  `animator_description` text,
  `animator_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`animator_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

CREATE TABLE `ro_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;





/* INSERT INTO `ro_animator` VALUES 
(1, 'Roger', 'Labbit', 'Aime danser', NULL),
(2, 'Michel', 'Bertier', 'Animateur culturel', NULL); */
