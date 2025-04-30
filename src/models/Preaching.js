const mongoose = require('mongoose')

const preachingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String },
    date: { type: Date, required: true },
    content: { type: String }, // <-- usa "content" si eso estás esperando en el front
    preacher: { type: String }, // <-- este campo faltaba
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
