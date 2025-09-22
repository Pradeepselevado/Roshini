const express = require('express');
const routers = express.Router();

// Use separate route files

// routers.use('/api', require("./routes/Categoryroute"));
routers.use('/newsfeed', require("./routes/Newsfeedroute"));
routers.use('/user', require("./routes/Userroute"));

module.exports = routers;
