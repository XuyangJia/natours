// import {readFileSync, writeFile} from 'fs'
// import { dirname, resolve} from 'path'
// import { fileURLToPath } from 'url'

// const __dirname = dirname(fileURLToPath(import.meta.url))
// const dataDir = resolve(__dirname, '../dev-data/data')
// const tours = JSON.parse(readFileSync(resolve(dataDir, 'tours.json')))
// import mongoose from 'mongoose'
import Tour from '../models/tourModel.js'

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

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
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
}
