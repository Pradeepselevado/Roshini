const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsfeedSchema = new Schema({ 
    newsfeed_title:String,
    newsfeed_description : {
        type: String,
    },
    newsfeed_image:String,
    publishedAt: { type: Date, default: Date.now},
    url:String
}, {
    suppressReservedKeysWarning: true
});

module.exports = mongoose.model("Newsfeedcollection", NewsfeedSchema);
