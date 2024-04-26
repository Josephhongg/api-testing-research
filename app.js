import dotenv from 'dotenv'
import express, { urlencoded, json } from 'express'

import institutions from './routes/institutions.js'
import departments from './routes/departments.js'
import courses from './routes/courses.js'
import notFound from "./routes/notFound.js";

dotenv.config()

const app = express()

const BASE_URL = 'api'

const PORT = process.env.PORT

app.use(urlencoded({ extended: false }))
app.use(json())

app.use(`/${BASE_URL}/institutions`, institutions)
app.use(`/${BASE_URL}/departments`, departments)
app.use(`/${BASE_URL}/courses`, courses)
app.use("*", notFound); 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default app