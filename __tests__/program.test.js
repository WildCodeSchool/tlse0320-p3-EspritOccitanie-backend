/* eslint-disable no-undef */
//
// users routes tests
const request = require('supertest');
const app = require('../src/server');
const connection = require('../db');

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// CREATE TABLE `ro_program` (
//   `program_id` int NOT NULL AUTO_INCREMENT,
//   `program_title` varchar(45) NOT NULL,
//   `program_description` text,
//   `program_image` varchar(255) DEFAULT NULL,
//   `ro_category_category_id` int NOT NULL,
//   PRIMARY KEY (`program_id`,`ro_category_category_id`),
//   KEY `fk_ro_program_ro_category1_idx` (`ro_category_category_id`),
//   CONSTRAINT `fk_ro_progam_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `ro_category` (`category_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

describe('Program - test (post/get/udapte/delete)', () => {
  const dataProgram = {
    program_title: 'Oiseau blanc',
    program_description: 'description de émission osieau blanc',
    program_image: '/img/oiseau-blanc/cover.jpg',
    ro_category_category_id: 1,
  };

  const valueCategorie = { category_id: 1, category_name: 'ecologie' };

  beforeEach((done) => connection.query('SET FOREIGN_KEY_CHECKS = 0;', done));
  beforeEach((done) => connection.query('TRUNCATE ro_category', done));
  beforeEach((done) => connection.query('TRUNCATE ro_program', done));
  beforeEach((done) => connection.query('INSERT INTO ro_category set ?', [valueCategorie], done));

  it('POST / create a new programm -> all values', async (done) => {
    request(app)
      .post('/program/create')
      .send(dataProgram)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const expected = {
          program_id: expect.any(Number),
          program_title: 'Oiseau blanc',
          program_description: 'description de émission osieau blanc',
          program_image: '/img/oiseau-blanc/cover.jpg',
          ro_category_category_id: 1,
        };
        expect(response.body).toEqual(expected);
        done();
      });
  });
});
