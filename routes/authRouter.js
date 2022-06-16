const express = require('express')
const UserModel = require('../models/userSchema')

const {check, validationResult} = require("express-validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router  = express.Router()

router.post('/registration', [
  check('username', "Username is requied!").notEmpty(),
  check('email', "Please use a valid email").isEmail(),
  check('password', "Please enter a password").notEmpty(),
  check("password", "Please enter a password with six or more characters").isLength({
    min: 6
  })
], async (req,res) => {
  const userData = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }
  try {
    const userExist = await UserModel.findOne({email: userData.email})

    if (userExist) {
      return res.json({
        msg: 'User already exists!'
      })
    }

    
    const SALT = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, SALT)
    userData.password = hashedPassword


    const user  = await UserModel.create(userData)

    const payload = {
      id: user._id,
      email: user.email
    }

    const TOKEN = jwt.sign(payload, process.env.SECRET_KEY)

    res.status(201).json({
      user:user,
      token: TOKEN
    })

  } catch (error) {
    console.log(error);
    res.status(400).json('Bad request')
  }
})

router.post('/login',[
  check('email', "Please provide a valid email").isEmail(),
  check("password", "Check your password").notEmpty()
] ,async (req, res) => {
  const userData = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  try {
    const user = await UserModel.findOne({
      email:userData.email,
      // password: userData.password
    
    })

    if (!user) {
      return res.json('User not found')
    }


    const isMatch = await bcrypt.compare(userData.password, user.password)

    if (!isMatch) {
      return res.json('Password is not a match')
    }

    const payload = {
      id: user._id,
      email: user.email
    }

    const TOKEN = jwt.sign(payload, process.env.SECRET_KEY)

    res.status(201).json({
      user:user,
      token: TOKEN
    })

  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error')

  }

  
})

module.exports = router