const express = require('express');
const router = express.Router()
const categoryController = require('../Controllers/categoryControllers')

router.get('/category', categoryController.getAllCategory);

router.get('/category/getbyid/:categoryId',categoryController.getCategoryById);

router.post('/category/create', categoryController.createCategory);

router.post('/category/update/:categoryId',categoryController.updateCategory)

router.post('/category/delete/:categoryId',categoryController.deleteCategoryById)

 router.post('/category/imageupload',categoryController.categoryUploadImage);

module.exports = router




