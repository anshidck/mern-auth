const express = require('express');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const bcript = require('bcryptjs');
const User = require('../models/userModel');
const { protect } =require('../middleware/authMiddleware')
const router = express.Router();

router.post('/', asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        throw new Error('please add all field')
    }

    const userExist = await User.findOne({email})
    
    if (userExist) {
        throw new Error('User already Exist')
    }

    //Hashed password
    const salt = await bcript.genSalt(10)
    const hashedPassword = await bcript.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid User Data')
    }
}))

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })

  if (user && (await bcript.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
}))

router.get('/me', protect ,asyncHandler(async(req, res) => {
    res.json(req.user)
}))

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

module.exports = router;