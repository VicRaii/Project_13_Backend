const Series = require('../models/Series')

const getPaginatedSeries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const skip = (page - 1) * limit

    const series = await Series.find()
      .populate('preachings')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Series.countDocuments()

    res.json({
      series,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    next(error)
  }
}

const getSeries = async (req, res) => {
  try {
    const series = await Series.find().populate('preachings')
    res.status(200).json(series)
  } catch (error) {
    res.status(500).json({ message: 'Error getting series', error })
  }
}

module.exports = { getPaginatedSeries, getSeries }
