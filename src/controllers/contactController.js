const Contact = require('../models/Contact')

const postContact = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newContact = new Contact({
      name,
      email,
      message
    })

    await newContact.save()

    return res.status(201).json({ message: 'Contact saved successfully' })
  } catch (error) {
    console.error('Contact Error:', error)
    next(error)
  }
}

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
    return res.status(200).json(contacts)
  } catch (error) {
    console.error('Get Contacts Error:', error)
    next(error)
  }
}
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Contact ID is required' })
    }

    await Contact.findByIdAndDelete(id)

    return res.status(200).json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Delete Contact Error:', error)
    next(error)
  }
}

module.exports = { postContact, getContacts, deleteContact }
