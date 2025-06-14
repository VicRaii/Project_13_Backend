const Preaching = require('../models/Preaching')
const Series = require('../models/Series')

const getPreachings = async (req, res) => {
  try {
    const preachings = await Preaching.find()
      .select('title date videoUrl preacher content series')
      .populate('series', 'title')
    res.status(200).json(preachings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener las predicaciones', error })
  }
}

const createPreaching = async (req, res) => {
  try {
    const { title, preacher, date, content, videoUrl, series } = req.body

    const preaching = new Preaching({
      title,
      preacher,
      date,
      content,
      videoUrl,
      series,
      createdBy: req.user._id
    })

    await preaching.save()

    if (series) {
      await Series.findByIdAndUpdate(series, {
        $addToSet: { preachings: preaching._id }
      })
    }

    return res.status(201).json(preaching)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating preaching', error: error.message })
  }
}

const updatePreaching = async (req, res) => {
  try {
    const updatedPreaching = await Preaching.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedPreaching) {
      return res.status(404).json({ message: 'Preaching not found' })
    }
    return res.status(200).json(updatedPreaching)
  } catch (error) {
    return res.status(500).json({ message: 'Error updating preaching', error })
  }
}

const deletePreaching = async (req, res) => {
  try {
    const deletedPreaching = await Preaching.findByIdAndDelete(req.params.id)
    if (!deletedPreaching) {
      return res.status(404).json({ message: 'Preaching not found' })
    }
    return res.status(200).json({ message: 'Preaching deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting preaching', error })
  }
}

module.exports = {
  getPreachings,
  createPreaching,
  updatePreaching,
  deletePreaching
}
