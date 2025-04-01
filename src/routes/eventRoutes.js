const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController')
const { isAuth } = require('../middleware/auth')
const upload = require('../middleware/upload')

const eventsRouter = require('express').Router()

eventsRouter.get('/', getEvents)
eventsRouter.get('/:id', getEventById)
eventsRouter.post('/', [isAuth, upload('Events').single('image')], createEvent)
eventsRouter.put(
  '/:id',
  [isAuth, upload('Events').single('image')],
  updateEvent
)
eventsRouter.delete('/:id', [isAuth], deleteEvent)

module.exports = eventsRouter
