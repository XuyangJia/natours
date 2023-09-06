import 'dotenv/config.js'
import {env} from 'process'
import app from './app.js'

console.log(env.NODE_ENV)
const PORT = env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
