const express = require('express')
const {Router} = express
const router = Router()

const {create,getbyid,update,getall,remove,signup,login} = require('../Controllers/usercontroller')

router.post('/update', update)
router.post('/getbyid', getbyid)
router.post('/create', create)
router.get('/getall', getall)
router.post('/remove', remove)
router.post('/signup', signup)
router.post('/login', login)

module.exports = router