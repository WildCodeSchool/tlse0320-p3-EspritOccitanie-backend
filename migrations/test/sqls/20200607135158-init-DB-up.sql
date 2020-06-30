CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_name_UNIQUE` (`category_name` ASC) 
);

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_program` (
  `program_id` INT NOT NULL AUTO_INCREMENT,
  `program_title` VARCHAR(45) NOT NULL,
  `program_description` TEXT(10000) NULL,
  `program_image` VARCHAR(255) NULL,
  `ro_category_category_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`program_id`),
  INDEX `fk_ro_program_ro_category1_idx` (`ro_category_category_id` ASC) ,
  UNIQUE INDEX `program_title_UNIQUE` (`program_title` ASC) ,
  CONSTRAINT `fk_ro_program_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `radiodb_eo_test`.`ro_category` (`category_id`) ON DELETE
  SET
    NULL ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_admin` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `admin_user` VARCHAR(16) NOT NULL,
  `admin_email` VARCHAR(255) NOT NULL,
  `admin_password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `admin_email_UNIQUE` (`admin_email` ASC) 
);

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_podcast` (
  `podcast_id` INT NOT NULL AUTO_INCREMENT,
  `podcast_title` VARCHAR(255) NOT NULL,
  `podcast_duration` VARCHAR(45) NULL,
  `podcast_description` TEXT(10000) NULL,
  `podcast_image` VARCHAR(255) NULL,
  `podcast_mp3` VARCHAR(255) NOT NULL,
  `podcast_creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `ro_program_program_id` INT NOT NULL,
  `ro_category_category_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`podcast_id`, `ro_program_program_id`),
  INDEX `fk_ro_podcast_ro_program1_idx` (`ro_program_program_id` ASC) ,
  INDEX `fk_ro_podcast_ro_category1_idx` (`ro_category_category_id` ASC) ,
  CONSTRAINT `fk_ro_podcast_ro_program1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `radiodb_eo_test`.`ro_program` (`program_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ro_podcast_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `radiodb_eo_test`.`ro_category` (`category_id`) ON DELETE
  SET
    NULL ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_animator` (
  `animator_id` INT NOT NULL AUTO_INCREMENT,
  `animator_firstname` VARCHAR(45) NOT NULL,
  `animator_lastname` VARCHAR(45) NOT NULL,
  `animator_description` TEXT(10000) NULL,
  `animator_image` VARCHAR(255) NULL,
  PRIMARY KEY (`animator_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `tag_name_UNIQUE` (`tag_name` ASC) 
);

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_animator_has_ro_progam` (
  `ro_animator_animator_id` INT NOT NULL,
  `ro_program_program_id` INT NOT NULL,
  PRIMARY KEY (
    `ro_animator_animator_id`,
    `ro_program_program_id`
  ),
  INDEX `fk_ro_animator_has_ro_progam_ro_progam1_idx` (`ro_program_program_id` ASC) ,
  INDEX `fk_ro_animator_has_ro_progam_ro_animator1_idx` (`ro_animator_animator_id` ASC) ,
  CONSTRAINT `fk_ro_animator_has_ro_progam_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `radiodb_eo_test`.`ro_animator` (`animator_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_ro_animator_has_ro_progam_ro_progam1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `radiodb_eo_test`.`ro_program` (`program_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_podcast_has_ro_animator` (
  `ro_podcast_podcast_id` INT NOT NULL,
  `ro_animator_animator_id` INT NOT NULL,
  PRIMARY KEY (
    `ro_podcast_podcast_id`,
    `ro_animator_animator_id`
  ),
  INDEX `fk_ro_podcast_has_ro_animator_ro_animator1_idx` (`ro_animator_animator_id` ASC) ,
  INDEX `fk_ro_podcast_has_ro_animator_ro_podcast1_idx` (`ro_podcast_podcast_id` ASC) ,
  CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_podcast1` FOREIGN KEY (`ro_podcast_podcast_id`) REFERENCES `radiodb_eo_test`.`ro_podcast` (`podcast_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `radiodb_eo_test`.`ro_animator` (`animator_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO `radiodb_eo_test`.`ro_category` (`category_id`, `category_name`) VALUES ('1', 'Economie');
INSERT INTO `radiodb_eo_test`.`ro_category` (`category_id`, `category_name`) VALUES ('2', 'Politique');
INSERT INTO `radiodb_eo_test`.`ro_category` (`category_id`, `category_name`) VALUES ('3', 'Musique');

INSERT INTO `radiodb_eo_test`.`ro_animator` (`animator_id`, `animator_firstname`, `animator_lastname`, `animator_description`, `animator_image`) VALUES ('1', 'Jacque', 'LAVERGNE', 'description1', 'image1');
INSERT INTO `radiodb_eo_test`.`ro_animator` (`animator_id`, `animator_firstname`, `animator_lastname`, `animator_description`, `animator_image`) VALUES ('2', 'Jerome', 'THEBEST', 'description2', 'image2');
INSERT INTO `radiodb_eo_test`.`ro_animator` (`animator_id`, `animator_firstname`, `animator_lastname`, `animator_description`, `animator_image`) VALUES ('3', 'Thomas', 'LAFFREUX', 'description3', 'image3');
INSERT INTO `radiodb_eo_test`.`ro_animator` (`animator_id`, `animator_firstname`, `animator_lastname`, `animator_description`, `animator_image`) VALUES ('4', 'Tristan', 'LEBILANGUE', 'description4', 'image4');

INSERT INTO `radiodb_eo_test`.`ro_program` (`program_id`, `program_title`, `program_description`, `program_image`, `ro_category_category_id`) VALUES ('1', 'Titre1', 'description1', 'image1', '1');
INSERT INTO `radiodb_eo_test`.`ro_program` (`program_id`, `program_title`, `program_description`, `program_image`, `ro_category_category_id`) VALUES ('2', 'Titre2', 'description1', 'image2', '2');
INSERT INTO `radiodb_eo_test`.`ro_program` (`program_id`, `program_title`, `program_description`, `program_image`, `ro_category_category_id`) VALUES ('3', 'Titre3', 'description1', 'image3', '3');
INSERT INTO `radiodb_eo_test`.`ro_program` (`program_id`, `program_title`, `program_description`, `program_image`, `ro_category_category_id`) VALUES ('4', 'Titre4', 'description1', 'image4', '4');