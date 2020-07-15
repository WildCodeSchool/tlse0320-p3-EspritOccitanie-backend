/* Replace with your SQL commands */
SET FOREIGN_KEY_CHECKS = 0; 

DROP TABLE IF EXISTS `ro_admin`;
DROP TABLE IF EXISTS `ro_animator_has_ro_program`;
DROP TABLE IF EXISTS `ro_animator`;
DROP TABLE IF EXISTS `ro_category`;
DROP TABLE IF EXISTS `ro_planning`;
DROP TABLE IF EXISTS `ro_program`;
DROP TABLE IF EXISTS `ro_podcast`;
DROP TABLE IF EXISTS `ro_tag`;
DROP TABLE IF EXISTS `ro_planning_has_ro_podcast`;
DROP TABLE IF EXISTS `ro_podcast_has_ro_animator`;
DROP TABLE IF EXISTS `ro_podcast_has_ro_tag`;
DROP TABLE IF EXISTS `ro_program_has_ro_planning`;
DROP TABLE IF EXISTS `ro_tag_has_ro_program`;

SET FOREIGN_KEY_CHECKS = 1; 
