const Series = require('../models/Series')

const getSeries = async (req, res) => {
  try {
    const series = await Series.find().populate('preachings')
    res.status(200).json(series)
  } catch (error) {
    res.status(500).json({ message: 'Error getting series', error })
  }
}

const getSeriesById = async (req, res) => {
  try {
    const { id } = req.params
    const series = await Series.findById(id).populate('preachings')

    if (!series) {
      return res.status(404).json({ message: 'Serie no encontrada' })
    }

    res.status(200).json(series)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la serie', error })
  }
}

module.exports = { getSeries, getSeriesById }
