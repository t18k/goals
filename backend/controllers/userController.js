const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//  @desc   register a new user
//  @POST   /api/users  
//  Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Fill out all fields
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please add all fields" })
        return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ message: "Already registered with this email" })
        return;
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creating User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    }
    else {
        res.json(400).json({ message: "Invalid Credentials" })
        return
    }
})

//  @desc   authenticate a new user
//  @POST   /api/login  
//  Public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    }
    else {
        res.status(400).json({ message: "Invalid Credentials" })
    }
})

//  @desc   get user data
//  @POST   /api/users  
//  Public 
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user
    if (_id && name && email) {
        res.status(200).json({
            _id,
            name,
            email
        })
        return
    }
    else {
        res.status(400).json({
            message: 'cant find a field in req.user'
        })
    }
})

// Generate Token
const genToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}