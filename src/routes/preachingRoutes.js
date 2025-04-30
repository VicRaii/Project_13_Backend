const {
  getPreachings,
  createPreaching,
  updatePreaching,
  deletePreaching
} = require('../controllers/preachingController')
const { isAuth } = require('../middleware/auth')

const preachingsRouter = require('express').Router()

preachingsRouter.get('/', [isAuth], getPreachings)
preachingsRouter.post('/', [isAuth], createPreaching)
preachingsRouter.put('/:id', [isAuth], updatePreaching)
preachingsRouter.delete('/:id', [isAuth], deletePreaching)

module.exports = preachingsRouter
