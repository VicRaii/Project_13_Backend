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

const postSeries = async (req, res) => {
  try {
    const { title, description, image } = req.body

    const newSeries = new Series({
      title,
      description,
      image
    })

    await newSeries.save()
    res.status(201).json(newSeries)
  } catch (error) {
    res.status(500).json({ message: 'Error creating series', error })
  }
}

const updateSeries = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, image } = req.body

    const updatedSeries = await Series.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    )

    if (!updatedSeries) {
      return res.status(404).json({ message: 'Serie no encontrada' })
    }

    res.status(200).json(updatedSeries)
  } catch (error) {
    res.status(500).json({ message: 'Error updating series', error })
  }
}

const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params
    const series = await Series.findByIdAndDelete(id)

    if (!series) {
      return res.status(404).json({ message: 'Serie no encontrada' })
    }

    res.status(200).json({ message: 'Serie eliminada' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting series', error })
  }
}

module.exports = {
  getSeries,
  getSeriesById,
  postSeries,
  updateSeries,
  deleteSeries
}
