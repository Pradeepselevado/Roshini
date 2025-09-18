const mongoose = require('mongoose')
const {Schema,model} = mongoose

const userSchema = new Schema({
    username : {type:String},
    password : {type : String},
    phoneno : {type:Number}
})

module.exports = model('user', userSchema)