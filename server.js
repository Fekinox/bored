import "dotenv/config.js"
import express from "express"
import './api/config/database.js'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import logger from 'morgan'
import cors from 'cors'

import apiRouter from './api/routes/api.js'
import createErrorHandler from "error-handler-json"

const app = express()
const PORT = process.env.PORT || 80

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(logger("dev"))

app.get('/', (req, res) => {
    res.json({ message: "this is the index route, the server is working" })
})

app.use('/api', apiRouter)

app.use(createErrorHandler())

app.listen(PORT, () => { console.log(`now listening on ${PORT}` )})

// export default app
