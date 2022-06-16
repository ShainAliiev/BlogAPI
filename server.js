const express = require('express');
require('dotenv').config()
const morgan = require('morgan')


const mongoConfig = require('./config/mongoConfig')
const authRouter = require('./routes/authRouter')
const blogsRouter = require('./routes/blogsRouter')
// const usersRouter = require('./routes/usersRouter')



const app = express();
const PORT = 2001;


app.use(express.json())
app.use(morgan('dev'))

// app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/blogs', blogsRouter)

app.get('/', (req, res) => {
  res.status(200).json('Welcome to my API')
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  mongoConfig()
})