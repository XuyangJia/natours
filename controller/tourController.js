import Tour from '../models/tourModel.js'
import APIFeatures from '../utils/apiFeatures.js'

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      message: { tour }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    })
  }
}

const aliasTopTours = async (req, res, next) => {
  req.query = {
    sort: '-ratingsAverage price',
    limit: 5,
    fields: 'name price ratingsAverage summary difficulty',
  }
  next()
}

const getAllTours = async (req, res) => {
  try {
    // EXCUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tours = await features.query

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: { tour }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: { tour }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

export default {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
}
