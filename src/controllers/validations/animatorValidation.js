/* eslint-disable indent */
const { check } = require('express-validator');

const checkAnimatorForm = [
    check('animator_firstname')
        .exists()
        .withMessage('value undefined')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage('empty or blank caracteres')
        .not()
        .isInt()
        .withMessage('is integer')
        .isLength({ min: 1, max: 60 })
        .withMessage('invalid number caracteres')
        .trim(),
    check('animator_description')
        .optional()
        .not()
        .isInt()
        .withMessage('is integer')
        .trim(),
    check('animator_image')
        .optional()
        .not()
        .isInt()
        .withMessage('is integer')
        .trim(),
];

module.exports = { checkAnimatorForm };
