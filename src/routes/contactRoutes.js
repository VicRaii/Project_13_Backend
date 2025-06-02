const {
  postContact,
  getContacts,
  deleteContact,
  markAsRead,
  replyToContact
} = require('../controllers/contactController')

const contactRouter = require('express').Router()

contactRouter.post('/', postContact)
contactRouter.post('/:id/reply', replyToContact)
contactRouter.get('/', getContacts)
contactRouter.put('/:id/read', markAsRead)
contactRouter.delete('/:id', deleteContact)

module.exports = contactRouter
