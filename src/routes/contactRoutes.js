const {
  postContact,
  getContacts,
  deleteContact
} = require('../controllers/contactController')

const contactRouter = require('express').Router()

contactRouter.post('/', postContact)
contactRouter.get('/', getContacts)
contactRouter.delete('/:id', deleteContact)

module.exports = contactRouter
