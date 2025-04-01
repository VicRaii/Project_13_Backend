const usersRouter = require('./authRoutes')
const eventsRouter = require('./eventRoutes')

const mainRouter = require('express').Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/events', eventsRouter)

module.exports = mainRouter
