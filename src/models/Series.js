const mongoose = require('mongoose')

const seriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    videoURL: { type: String },
    preachings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Preaching' }]
  },
  { timestamps: true }
)

const Series = mongoose.model('Series', seriesSchema)
module.exports = Series
