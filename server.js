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

const corsSettings = {
    credentials: true,
    origin: 'https://bored-fekinox-frontend-36d7e5057a53.herokuapp.com',
}

// Cross-origin request handling
app.use(cors(corsSettings))

// Parse the bodies of url encoded form and json requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Parse cookies
app.use(cookieParser())

// Log all requests
app.use(logger("dev"))

// Dummy index route to see if things are working
app.get('/', (req, res) => {
    res.json({ message: "this is the index route, the server is working" })
})

// Main API endpoint- everything routes through here
app.use('/api', apiRouter)

// Error-handling middleware
app.use(createErrorHandler())

app.listen(PORT, () => { console.log(`now listening on ${PORT}` )})

// export default app
