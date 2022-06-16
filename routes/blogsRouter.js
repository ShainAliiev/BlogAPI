const express = require('express')
const { model } = require('mongoose')
const BlogModel = require('../models/blogSchema')

const router = express.Router()

router.post('/', async (req, res) => {
  const blogData = req.body

  try {
    const blog = await BlogModel.create(blogData)
    res.status(201).json(blog)
  } catch (error) {
    console.log(error);
    res.status(400).json("Bad request")
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await BlogModel.find()
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error);
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const blog = await BlogModel.findById(id)
    res.status(200).json(blog)
  } catch (error) {
    console.log(error);
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const newBlogData = req.body
  try {
    const blog = await BlogModel.findByIdAndUpdate(id, newBlogData, {
      new: true
    })
    res.status(202).json(blog)
  } catch (error) {
    console.log(error);
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const blog = await BlogModel.findByIdAndDelete(id)
    res.status(200).json({
      msg: "Blog was deleted"
    })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router