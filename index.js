const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const HTTP_SERVER = express();
const axios = require('axios');
const config = require("./Database/Db")
const PORT = process.env.PORT || 5000;
const path = require('path');

HTTP_SERVER.use(express.json())
HTTP_SERVER.use(bodyParser.json())
HTTP_SERVER.use(express.urlencoded({extended:false}))
HTTP_SERVER.use(cors())

const staticcategoryImagesPath = path.join(process.cwd(), 'Controllers', 'CategoryImageUpload', 'Image');
HTTP_SERVER.use('/api/CategoryImageUpload/Image', express.static(staticcategoryImagesPath));

const staticnewsfeedImagesPath = path.join(process.cwd(), 'controllers', 'NewsFeed', 'Image');
HTTP_SERVER.use('/NewsFeed/Image', express.static(staticnewsfeedImagesPath));

HTTP_SERVER.get('/', (req, res) => {
    console.log('Server is running.');
    res.send('Server is running.');   // res.send use - display that contains.
});



HTTP_SERVER.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

HTTP_SERVER.use('/',require('./app'));