const User = require('../models/user.model')

const GetMeInfo =  async (req, res) => {      
    try {
        const user = await User.findById(req.user.userId).select('-password')
        if(!user){
            throw Error("User not founded!")
        }
        res.status(200).json({
            message: "success",
            user: user
        })
    } catch (error) {
        res.json(error)
    }
}

const GetUsers =  async (req, res) => {   
       
    try {
        const users = await User.find()
        if(!users){
            throw Error('User not founded!')
        }
        res.status(200).json({
            message: "success",
            users
        })
    } catch (error) {
        res.json(error)
    }
}

const GetUser =  async (req, res) => {    
      
    try {
        const id  = req.params.id
        const user = await User.findById(id)
        if(!user){
            throw Error('User not founded!')
        }
        res.status(200).json({
            message: "success",
            user
        })
    } catch (error) {
        console.log('error', error)
        res.json(error)
    }
}

const EditUser =  async (req, res) => {  
    console.log('users', req.body)
    try {
        const tokenId = req.user.userId
        const id  = req.params.id
        const isAdmin = await User.findById(tokenId)
        if(isAdmin.role != 'admin' ){
            throw Error('Editing is for admin only!')
        }
        const user = await User.findOneAndUpdate({ _id: id}, req.body)

        if(!user){
            throw Error('User not founded!')
        }
        
        res.status(200).json({
            message: "success",
            user
        })
    } catch (error) {
        console.log('error', error)
        res.json(error)
    }
}

const DeleteUser =  async (req, res) => {      
    try {
        const tokenId = req.user.userId
        const id  = req.params.id

        const isAdmin = await User.findById(tokenId)
        if(isAdmin.role != 'admin' ){
            throw Error('Deleting is for admin only!')
        }

        const user = await User.findByIdAndDelete(id)
        
        if(!user){
            throw Error('User not founded!')
        }
        
        res.status(200).json({
            message: "User deleted",
        })
    } catch (error) {
        console.log('error', error)
        res.status(403).json({
            message: error.message
        })
    }
}

module.exports = {
    GetMeInfo,
    GetUsers,
    GetUser,
    EditUser,
    DeleteUser
}