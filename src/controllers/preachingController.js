const Preaching = require('../models/Preaching')

const getPreachings = async (req, res) => {
  try {
    const preachings = await Preaching.find().populate('createdBy', 'name')
    return res.status(200).json(preachings)
  } catch (error) {
    return res.status(500).json({ message: 'Error getting preachings', error })
  }
}

const createPreaching = async (req, res) => {
  try {
    const { title, preacher, date, content, videoUrl } = req.body
    const preaching = new Preaching({
      title,
      preacher,
      date,
      content,
      videoUrl,
      createdBy: req.user._id
    })
    await preaching.save()
    return res.status(201).json(preaching)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating preaching', error: error.message })
  }
}

//! SEGUIR EL CRUD

module.exports = { getPreachings, createPreaching }
