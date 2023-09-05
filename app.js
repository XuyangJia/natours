import {readFileSync, writeFile} from 'fs'
import { dirname, resolve} from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const PORT = 3000
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json())
const tours = JSON.parse(readFileSync(resolve(__dirname, 'dev-data/data/tours.json')))
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {tours},
  })
})
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body)
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({id:newId}, req.body)
  tours.push(newTour)
  writeFile(resolve(__dirname, 'dev-data/data/tours-simple.json'), JSON.stringify(tours), (err) => {
    if (err) console.log(err)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
