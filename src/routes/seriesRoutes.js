const {
  getPaginatedSeries,
  getSeries
} = require('../controllers/seriesController')

const seriesRouter = require('express').Router()

seriesRouter.get('/', getSeries)

module.exports = seriesRouter
