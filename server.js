import 'dotenv/config'
import {env} from 'process'
import app from './app.js'

const PORT = env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
