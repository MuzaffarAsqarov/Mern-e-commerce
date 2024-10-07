const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AddToCart = require("../models/addToCart.model")

const generateJWTToken = userId => {
    const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '7h' })
    return accessToken;
}

const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            image: req.file && req.file.filename
        })
        const user = await newUser.save()

        const token = generateJWTToken(user._id)

        res.status(201).json({
            message: "Success",
            user,
            token
        })
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            res.status(403).json({
                error: 'email must be unique'
            })
        } else {
            res.status(403).json({
                error: error.message
            })
        }
    }
}

const UserLogin = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        const isExist = await User.login(email, password)

        const token = generateJWTToken(isExist._id) 

        // const count = await AddToCart.countDocuments({userId : isExist._id})

        res.status(200).json({
            message: 'success',
            user: {
                user: isExist,
                userToken: token
            },
            // count
        })
    }catch (error) {
        console.log({error: error.message})
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    CreateUser,
    UserLogin,
}