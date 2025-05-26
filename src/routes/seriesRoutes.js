const {
  getSeries,
  getSeriesById,
  postSeries,
  deleteSeries
} = require('../controllers/seriesController')
const { isAdmin, isAuth } = require('../middleware/auth')

const seriesRouter = require('express').Router()

seriesRouter.get('/', [isAuth], getSeries)
seriesRouter.get('/:id', getSeriesById)
seriesRouter.post('/', [isAdmin], postSeries)
seriesRouter.delete('/:id', [isAdmin], deleteSeries)

module.exports = seriesRouter
