import 'dotenv/config'
import process from 'process'
import { readFileSync } from 'fs'
import { dirname, resolve} from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import Tour from '../../models/tourModel.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const { DATABASE_URI, DATABASE_PASSWORD } = process.env
const uri = DATABASE_URI.replace('<PASSWORD>', DATABASE_PASSWORD)
mongoose
  .connect(uri)
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch(err => {
    console.log(err.message)
  })

// READ JSON FILE
const tours = JSON.parse(
  readFileSync(resolve(__dirname, 'tours-simple.json'), 'utf8')
)
tours.forEach(obj => delete obj.id)

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    console.log('loading data ....')
    await Tour.create(tours)
    console.log('Data successfully loaded!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

// DELETE ALL FROM DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

console.log(process.argv)
if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
