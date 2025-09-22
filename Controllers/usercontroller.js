const UserModel = require('../models/usermastermodel')

exports.getall = async(req,res)=>{
    const Users = await UserModel.find({})
    if(!Users){
            return res.json({'Message':'Requested user not found'})
        }
    return res.json({'Message':'Users found successfully',Users})
}
exports.create = async(req,res)=>{
    try
    {
        const {username,password,phoneno} = req.body
        const User = new UserModel({username,password,phoneno})
        await User.save()
        return res.json({'Message':'User saved successfully', User})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.getbyid = async(req,res)=>{
    try
    {
        const {id} = req.body
        const User = await UserModel.findById(id)
        if(!User){
            return res.json({'Message':'Requested user not found'})
        }
        return res.json({'Message':'User found successfully',User})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.update = async(req,res)=>{
    try
    {
        const {id} = req.body
        const {username,password,phoneno} = req.body
        const updateObj = {}
        if(username) updateObj.username = username
        if(password) updateObj.password = password
        if(phoneno) updateObj.phoneno = phoneno
        const User = await UserModel.findByIdAndUpdate(id,updateObj,{new:true})
        if(!User){
            return res.json({'Message':'Requested user not found'})
        }
        return res.json({'Message':'User updated successfully',User})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.remove = async(req,res)=>{
    try{
        const {id} = req.body
        const User = await UserModel.findByIdAndDelete(id)
        return res.json({'Message':'User deleted successfully',User})
    }
    catch(err){
        return res.json({'Message':'Something went wrong',Error:err.message})
    }
}

exports.signup = async (req, res) => {
    try {
        const { username, password, phoneno } = req.body

        // check if user already exists
        const existingUser = await UserModel.findOne({ phoneno })
        if (existingUser) {
            return res.json({ 'Message': 'User already exists' })
        }

        // save new user
        const newUser = new UserModel({
            username,
            password,   // ⚠️ storing plain password (not secure)
            phoneno
        })

        await newUser.save()
        return res.json({ 'Message': 'Signup successful', User: newUser })
    }
    catch (err) {
        return res.json({ 'Message': 'Something went wrong', Error: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { phoneno, password } = req.body

        // check user
        const user = await UserModel.findOne({ phoneno, password })
        if (!user) {
            return res.json({ 'Message': 'Invalid phoneno or password' })
        }

        return res.json({ 'Message': 'Login successful', User: user })
    }
    catch (err) {
        return res.json({ 'Message': 'Something went wrong', Error: err.message })
    }
}

