import 'dotenv/config'
import process from 'process'
import mongoose from 'mongoose'
import app from './app.js'

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(`Name:"${err.name}", Message:"${err.message}"`)
  process.exit(1)
})

const { PORT = 3000, DATABASE_URI, DATABASE_PASSWORD } = process.env
const uri = DATABASE_URI.replace('<PASSWORD>', DATABASE_PASSWORD)
mongoose
  .connect(uri)
  .then(() => {
    console.log('DB connection successful!')
  })

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(`Name:"${err.name}", Message:"${err.message}"`)
  server.close(() => {
    process.exit(1)
  })
})
