import {readFileSync, writeFile} from 'fs'
import { dirname, resolve} from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = resolve(__dirname, '../dev-data/data')
const tours = JSON.parse(readFileSync(resolve(dataDir, 'tours.json')))

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {tours},
  })
}
const createTour = (req, res) => {
  console.log(req.body)
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({id:newId}, req.body)
  tours.push(newTour)
  writeFile(resolve(dataDir, 'tours-simple.json'), JSON.stringify(tours), (err) => {
    if (err) console.log(err)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}

export default {
  getAllTours,
  createTour,
}
