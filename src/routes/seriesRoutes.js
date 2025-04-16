const { getSeries, getSeriesById } = require('../controllers/seriesController')

const seriesRouter = require('express').Router()

seriesRouter.get('/', getSeries)
seriesRouter.get('/:id', getSeriesById)

module.exports = seriesRouter
