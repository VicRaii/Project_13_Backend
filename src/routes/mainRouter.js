const usersRouter = require('./authRoutes')
const contactRouter = require('./contactRoutes')
const preachingsRouter = require('./preachingRoutes')
const seriesRouter = require('./seriesRoutes')

const mainRouter = require('express').Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/preachings', preachingsRouter)
mainRouter.use('/series', seriesRouter)
mainRouter.use('/contact', contactRouter)

module.exports = mainRouter
