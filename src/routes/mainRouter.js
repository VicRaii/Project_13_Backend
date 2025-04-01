const usersRouter = require('./authRoutes')

const mainRouter = require('express').Router()

mainRouter.use('/users', usersRouter)

module.exports = mainRouter
