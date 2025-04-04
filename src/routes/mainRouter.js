const usersRouter = require('./authRoutes')
const eventsRouter = require('./eventRoutes')
const preachingsRouter = require('./preachingRoutes')

const mainRouter = require('express').Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/events', eventsRouter)
mainRouter.use('/preachings', preachingsRouter)

module.exports = mainRouter
