const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotificationMasterSchema = new Schema(
    {
        newsfeed_title: String,
        category_name: String,
        newsfeed_image:String,
        newsfeed_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'newsfeedcollection' }],
        deviceId:String
          
    }
);

module.exports = mongoose.model("notification_master", NotificationMasterSchema);