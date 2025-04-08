const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    preaching: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preaching'
    }
  },
  {
    timestamps: true
  }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
