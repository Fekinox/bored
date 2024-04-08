import { configDotenv } from "dotenv";
import express from "express"

import logger from 'morgan'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(logger("dev"))
