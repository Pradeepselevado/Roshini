const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usercontroller');


router.get('/getall',userController.getall);
router.post('/getbyid', userController.getbyid);
router.post('/create',userController.create);
router.post('/update',userController.update);
router.post('/remove',userController.remove);
router.post('/signup',userController.signup);
router.post('/login',userController.login);

module.exports = router;