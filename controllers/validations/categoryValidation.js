/* eslint-disable indent */
const { check } = require('express-validator');

const checkCategoryForm = [
  check('category_name')
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
    .trim()
    .escape(),

];



module.exports = { checkCategoryForm };
