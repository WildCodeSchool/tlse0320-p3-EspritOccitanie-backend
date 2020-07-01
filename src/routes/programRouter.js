/* eslint-disable indent */

const express = require('express');

const router = express.Router({ mergeParams: true });
const { ProgramController } = require('../../controllers/programController');

router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    }),
);

router.post('/', ProgramController.postProgram);
router.get('/', ProgramController.getAllPrograms);
router.put('/:id', ProgramController.putProgram);
router.delete('/:id', ProgramController.delProgram);
router.get('/:id', ProgramController.getOneProgram);

module.exports = router;
