import "dotenv/config.js"
import express from "express"
import './config/database.js'
import bodyParser from "body-parser"

import logger from 'morgan'
import cors from 'cors'

import apiRouter from './routes/api.js'
import createErrorHandler from "error-handler-json"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(logger("dev"))


app.use('/api', apiRouter)

app.use(createErrorHandler())

app.listen(3000, () => console.log(`now listening on ${PORT}`))

// export default app
