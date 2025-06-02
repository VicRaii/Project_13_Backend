const {
  postContact,
  getContacts,
  deleteContact,
  markAsRead
} = require('../controllers/contactController')

const contactRouter = require('express').Router()

contactRouter.post('/', postContact)
contactRouter.get('/', getContacts)
contactRouter.put('/:id/read', markAsRead)
contactRouter.delete('/:id', deleteContact)

module.exports = contactRouter
