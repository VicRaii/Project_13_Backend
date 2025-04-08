const mongoose = require('mongoose')

const preachingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    preacher: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String }
  },
  { timestamps: true }
)

const Preaching = mongoose.model('Preaching', preachingSchema)
module.exports = Preaching
