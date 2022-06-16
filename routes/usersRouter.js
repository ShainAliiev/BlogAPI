/*
const express = require('express')


const UserModel = require('../models/userSchema')

const router = express.Router()

router.post('/', async (req, res) => {
  const userData = req.body
  try {
    const user = await UserModel.findOne({email: userData.email})
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error')
  }
} )
*/