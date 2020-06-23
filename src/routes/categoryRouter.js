const express = require('express');

const router = express.Router({ mergeParams: true });
const { CategoryController } = require('../../controllers/CategoryController');

const { checkCategoryForm } = require('../../controllers/validations/categoryValidation');
const { Check } = require('../../controllers/checkErrors');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  }),
);

router.post('/', checkCategoryForm, Check.error, CategoryController.postCategory);
router.get('/', CategoryController.getAllCategory);

module.exports = router;
