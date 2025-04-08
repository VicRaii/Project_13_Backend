const jwt = require('jsonwebtoken')
const Event = require('../models/Event')

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('preaching')
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: 'Error getting events', error })
  }
}

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, image } = req.body
    const event = new Event({
      title,
      description,
      date,
      location,
      image,
      createdBy: req.user._id
    })
    await event.save()
    return res.status(201).json(event)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating event', error: error.message })
  }
}

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      'createdBy',
      'name'
    )
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ message: 'Error getting event by ID', error })
  }
}

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }
    res.status(200).json(updatedEvent)
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el evento', error })
  }
}

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id)
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.status(200).json({ message: 'Event Deleted Succesfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error })
  }
}

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent
}
