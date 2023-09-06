import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import morgan from 'morgan'
import tourRouter from './router/tourRoutes.js'
import userRouter from './router/userRoutes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
const app = express()

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(resolve(__dirname, 'public')))

// ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

export default app
