const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database')
  } catch (error) {
    console.log('Failed to connect to database', error.message)
  }
}

module.exports = { connectDB }
