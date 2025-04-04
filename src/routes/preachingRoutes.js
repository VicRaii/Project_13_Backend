const {
  getPreachings,
  createPreaching
} = require('../controllers/preachingController')
const { isAuth } = require('../middleware/auth')

const preachingsRouter = require('express').Router()

preachingsRouter.get('/', getPreachings)
preachingsRouter.post('/', [isAuth], createPreaching)

module.exports = preachingsRouter
