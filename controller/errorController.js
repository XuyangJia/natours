import { env } from 'process'
import AppError from '../utils/appError.js'

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(val => val.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
  const key = Reflect.ownKeys(err.keyValue)[0]
  const value = err.keyValue[key]
  const message = `Duplicate field value: "${value}" for key: "${key}". Please use anthor value!`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  const { status , message, stack } = err
  res.status(err.statusCode).json({ status, message, stack, error: err })
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    const { status , message } = err
    res.status(err.statusCode).json({ status, message })
  } else { // Programming or other unknown error: don't leak error details
    // 1) Log the error
    console.error('ERROR: ', err)

    // 2) send generit message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
  }
}

export default (err, req, res, next) => {
  const { NODE_ENV } = env
  err.status ||= 'error'
  err.statusCode ||= 500
  if (NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (NODE_ENV === 'production') {
    let error = err
    console.log(err)
    if (err.name === 'CastError') error = handleCastErrorDB(error)
    if (err.code === 11000) error = handleDuplicateFieldsDB(error)
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
    sendErrorProd(error, res)
  }
  next()
}
