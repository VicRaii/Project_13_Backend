const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
