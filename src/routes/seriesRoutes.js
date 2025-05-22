const {
  getSeries,
  getSeriesById,
  postSeries,
  deleteSeries
} = require('../controllers/seriesController')

const seriesRouter = require('express').Router()

seriesRouter.get('/', getSeries)
seriesRouter.get('/:id', getSeriesById)
seriesRouter.post('/', postSeries)
seriesRouter.delete('/:id', deleteSeries)

module.exports = seriesRouter
