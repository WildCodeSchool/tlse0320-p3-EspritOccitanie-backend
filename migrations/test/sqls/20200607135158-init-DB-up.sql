-- -----------------------------------------------------
-- Schema radiodb_eo_test
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `radiodb_eo_test`;

-- USE `radiodb_eo_test`;

-- -----------------------------------------------------
-- Schema radiodb_eo_test
-- -- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `radiodb_eo_test`;

-- USE `radiodb_eo_test`;

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_name_UNIQUE` (`category_name` ASC) VISIBLE
);

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_program`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_program` (
  `program_id` INT NOT NULL AUTO_INCREMENT,
  `program_title` VARCHAR(45) NOT NULL,
  `program_description` TEXT(10000) NULL,
  `program_image` VARCHAR(255) NULL,
  `ro_category_category_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`program_id`),
  INDEX `fk_ro_program_ro_category1_idx` (`ro_category_category_id` ASC) VISIBLE,
  UNIQUE INDEX `program_title_UNIQUE` (`program_title` ASC) VISIBLE,
  CONSTRAINT `fk_ro_program_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `radiodb_eo_test`.`ro_category` (`category_id`) ON DELETE
  SET
    NULL ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_admin` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `admin_user` VARCHAR(16) NOT NULL,
  `admin_email` VARCHAR(255) NOT NULL,
  `admin_password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `admin_email_UNIQUE` (`admin_email` ASC) VISIBLE
);

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_podcast`
-- -----------------------------------------------------
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
  INDEX `fk_ro_podcast_ro_program1_idx` (`ro_program_program_id` ASC) VISIBLE,
  INDEX `fk_ro_podcast_ro_category1_idx` (`ro_category_category_id` ASC) VISIBLE,
  CONSTRAINT `fk_ro_podcast_ro_program1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `radiodb_eo_test`.`ro_program` (`program_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ro_podcast_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `radiodb_eo_test`.`ro_category` (`category_id`) ON DELETE
  SET
    NULL ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_animator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_animator` (
  `animator_id` INT NOT NULL AUTO_INCREMENT,
  `animator_firstname` VARCHAR(45) NOT NULL,
  `animator_lastname` VARCHAR(45) NOT NULL,
  `animator_description` TEXT(10000) NULL,
  `animator_image` VARCHAR(255) NULL,
  PRIMARY KEY (`animator_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `tag_name_UNIQUE` (`tag_name` ASC) VISIBLE
);

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_animator_has_ro_progam`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_animator_has_ro_progam` (
  `ro_animator_animator_id` INT NOT NULL,
  `ro_program_program_id` INT NOT NULL,
  PRIMARY KEY (
    `ro_animator_animator_id`,
    `ro_program_program_id`
  ),
  INDEX `fk_ro_animator_has_ro_progam_ro_progam1_idx` (`ro_program_program_id` ASC) VISIBLE,
  INDEX `fk_ro_animator_has_ro_progam_ro_animator1_idx` (`ro_animator_animator_id` ASC) VISIBLE,
  CONSTRAINT `fk_ro_animator_has_ro_progam_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `radiodb_eo_test`.`ro_animator` (`animator_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_ro_animator_has_ro_progam_ro_progam1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `radiodb_eo_test`.`ro_program` (`program_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `radiodb_eo_test`.`ro_podcast_has_ro_animator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `radiodb_eo_test`.`ro_podcast_has_ro_animator` (
  `ro_podcast_podcast_id` INT NOT NULL,
  `ro_animator_animator_id` INT NOT NULL,
  PRIMARY KEY (
    `ro_podcast_podcast_id`,
    `ro_animator_animator_id`
  ),
  INDEX `fk_ro_podcast_has_ro_animator_ro_animator1_idx` (`ro_animator_animator_id` ASC) VISIBLE,
  INDEX `fk_ro_podcast_has_ro_animator_ro_podcast1_idx` (`ro_podcast_podcast_id` ASC) VISIBLE,
  CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_podcast1` FOREIGN KEY (`ro_podcast_podcast_id`) REFERENCES `radiodb_eo_test`.`ro_podcast` (`podcast_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `radiodb_eo_test`.`ro_animator` (`animator_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);