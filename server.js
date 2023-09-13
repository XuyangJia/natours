import 'dotenv/config'
import process from 'process'
import mongoose from 'mongoose'
import app from './app.js'

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
  console.log(`Name:"${err.name}", Message:"${err.message}"`)
  console.log('UNHANDLED REJECTION! Server is shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
