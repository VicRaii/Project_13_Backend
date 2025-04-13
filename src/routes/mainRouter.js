const usersRouter = require('./authRoutes')
const contactRouter = require('./contactRoutes')
const eventsRouter = require('./eventRoutes')
const preachingsRouter = require('./preachingRoutes')

const mainRouter = require('express').Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/events', eventsRouter)
mainRouter.use('/preachings', preachingsRouter)
mainRouter.use('/contact', contactRouter)

module.exports = mainRouter
