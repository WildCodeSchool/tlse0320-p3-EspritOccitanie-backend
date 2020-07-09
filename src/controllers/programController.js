/* eslint-disable camelcase */
/* eslint-disable indent */

const { ProgramModel } = require('../models/programModel');

class ProgramController {
  static addAnimator(req, res) {
    ProgramModel.addAnimator(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}`, data: 'refq' });
      }

      return res
        .status(200)
        .json({ message: 'OK', dataSend: req.body, affectedRows: results.affectedRows });
    });
  }

  static postProgram(req, res) {
    ProgramModel.postProgram(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}`, data: 'refq' });
      }
      req.program_id = results.insertId;
      const ro_program_program_id = req.program_id;
      return ProgramModel.addAnimator(req, ro_program_program_id, (err1, result1) => {
        if (err1) {
          return res.status(500).json({ error: `${err1}`, data: 'refq' });
        }
        return res.status(200).json(result1);
      });
    });
  }

  static getAllPrograms(req, res) {
    const { animator, categorie } = req.query;
    if (animator) {
      ProgramModel.getAllProgramsFromAnimator(req, animator, (err, results) => {
        if (err) {
          return res.status(500).json({ error: `${err}` });
        }
        return res.status(200).json(results);
      });
    } else if (categorie) {
      ProgramModel.getAllProgramsFromCategory(req, categorie, (err, results) => {
        if (err) {
          return res.status(500).json({ error: `${err}` });
        }
        return res.status(200).json(results);
      });
    } else {
      ProgramModel.getAllPrograms(req, (err, results) => {
        if (err) {
          return res.status(500).json({ error: `${err}` });
        }
        return res.status(200).json(results);
      });
    }
  }

  static getOneProgram(req, res) {
    ProgramModel.getOneProgram(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json(results[0]);
    });
  }

  static get4LatestPrograms(req, res) {
    ProgramModel.get4LatestPrograms(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json(results);
    });
  }

  static delProgram(req, res) {
    ProgramModel.delProgram(req, (err) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json({ message: 'field deleted' });
    });
  }

  static putProgram(req, res) {
    ProgramModel.putProgram(req, (err) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      req.program_id = req.params.id;
      const ro_program_program_id = req.program_id;
      return ProgramModel.deleteAnimatorProgram(req, ro_program_program_id, (err2, result2) => {
        if (err2) {
          return res.status(500).json({ error: `${err2}` });
        }
        return ProgramModel.addAnimator(req, ro_program_program_id, (err1, result1) => {
          if (err1) {
            return res.status(500).json({ error: `${err1}`, data: 'refq' });
          }
          return res.status(200).json(result1);
        });
      });
    });
  }
}

module.exports = { ProgramController };
