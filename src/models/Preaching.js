const mongoose = require('mongoose')

const preachingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String },
    date: { type: Date, required: true },
    description: { type: String },
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Series'
    }
  },
  {
    timestamps: true
  }
)

const Preaching = mongoose.model('Preaching', preachingSchema)
module.exports = Preaching
