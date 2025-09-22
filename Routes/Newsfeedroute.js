const express = require('express');
const router = express.Router();
const newsfeedController = require('../Controllers/newsfeedControllers');


router.get('/getall',newsfeedController.getall);
router.post('/getbyid', newsfeedController.getbyid)
// router.post('/notif/getall',newsfeedController.getNotification);
router.post('/create',newsfeedController.create);
router.post('/update',newsfeedController.update);
router.post('/remove',newsfeedController.remove)
router.post('/imageupload',newsfeedController.imageupload)

module.exports = router;