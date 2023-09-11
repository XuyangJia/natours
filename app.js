import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { env } from 'process'
import express from 'express'
import morgan from 'morgan'
import AppError from './utils/appError.js'
import globalErrorHandler from './controller/errorController.js'
import tourRouter from './router/tourRoutes.js'
import userRouter from './router/userRoutes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

// MIDDLEWARES
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static(resolve(__dirname, 'public')))

// ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // })
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
