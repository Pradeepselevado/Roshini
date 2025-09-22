const NewsFeedModel = require('../Models/newsfeedModels')
const multer = require('multer')
const path = require('path')

exports.getall = async(req,res)=>{
    const Data = await NewsFeedModel.find({})
    if(!Data){
            return res.json({'Message':'Requested data not found'})
        }
    return res.json({'Message':'Data found successfully',Data})
}
exports.create = async(req,res)=>{
    try
    {
        const {newsfeed_title,newsfeed_description,newsfeed_image,url} = req.body
        const Data = new NewsFeedModel({newsfeed_title,newsfeed_description,newsfeed_image,url})
        await Data.save()
        return res.json({'Message':'Data saved successfully', Data})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.getbyid = async(req,res)=>{
    try
    {
        const {id} = req.body
        const Data = await NewsFeedModel.findById(id)
        if(!Data){
            return res.json({'Message':'Requested data not found'})
        }
        return res.json({'Message':'Data found successfully',Data})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.update = async(req,res)=>{
    try
    {
        const {id} = req.body
        const {newsfeed_title,newsfeed_description,newsfeed_image,url} = req.body
        const updateObj = {}
        if(newsfeed_title) updateObj.newsfeed_title = newsfeed_title
        if(newsfeed_description) updateObj.newsfeed_description = newsfeed_description
        if(newsfeed_image) updateObj.newsfeed_image = newsfeed_image
        if(url) updateObj.url = url
        const Data = await NewsFeedModel.findByIdAndUpdate(id,updateObj,{new:true})
        if(!Data){
            return res.json({'Message':'Requested data not found'})
        }
        return res.json({'Message':'Data updated successfully',Data})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.remove = async(req,res)=>{
    try{
        const {id} = req.body
        const Data = await NewsFeedModel.findByIdAndDelete(id)
        return res.json({'Message':'User deleted successfully',Data})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.imageupload = async (req, res, next) => {
    try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/NewsFeed/Image');
      const Storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
          const originalname = file.originalname;
          const fileExtension = path.extname(originalname); // Get the file extension
          const uniqueSuffix = Date.now(); // Generate a unique suffix
          const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
          UploadedfileName = '/NewsFeed/Image/' + newFilename;
          cb(null, newFilename);
        }
      });
  
      const upload = multer({ storage: Storage }).single('newsfeed_image');
      upload(req, res, async function (err) {
        if (err) {
          // Handle upload error
          return res.status(500).send('Error uploading file.' + err);
        }
        res.json({ Category_image: UploadedfileName }); // Send a JSON response
      });
    }
    catch (error) {
      res.status(500).json({ error: "Error sample Image Upload" + error });
    }
  };

