import express from 'express'
import morgan from 'morgan'
import tourRouter from './router/tourRoutes.js'
import userRouter from './router/userRoutes.js'

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

export default app
