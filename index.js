require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./src/config/db')
const mainRouter = require('./src/routes/mainRouter')

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/v1/', mainRouter)

app.use('/', (req, res) => {
  return res.status(404).json('Route Not Found')
})

app.listen(3000, () => {
  console.log('Server started on: http://localhost:3000/')
})
