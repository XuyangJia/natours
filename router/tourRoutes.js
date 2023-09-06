import express from 'express'
import tourController from '../controller/tourController.js'

const tourRouter = express.Router()
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour)

export default tourRouter
