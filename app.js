const express = require('express')
const router = express()

router.use('/user', require('./Routes/userroute'))

module.exports = router