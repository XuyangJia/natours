import 'dotenv/config'
import {env} from 'process'
import mongoose from 'mongoose'
import app from './app.js'

const { PORT = 3000, DATABASE_URI, DATABASE_PASSWORD } = env
const uri = DATABASE_URI.replace('<PASSWORD>', DATABASE_PASSWORD)
mongoose.connect(uri, {
}).then(() => console.log('Connected!'))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
