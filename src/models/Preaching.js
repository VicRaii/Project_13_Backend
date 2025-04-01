const mongoose = require('mongoose')

const preachingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    preacher: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    cideoUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

const Preaching = mongoose.model('Preaching', preachingSchema)
module.exports = Preaching
