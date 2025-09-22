const express = require('express');
const routers = express.Router();

// Use separate route files

routers.use('/api', require("./Routes/Categoryroute"));
routers.use('/newsfeed', require("./Routes/Newsfeedroute"));
routers.use('/user', require("./Routes/userroute"));

module.exports = routers;
