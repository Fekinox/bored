import 'dotenv/config.js'
import mongoose from 'mongoose'

const db = mongoose.connection
const opts = {
}

console.log(`Connecting to MongoDB instance ${process.env.DATABASE_URI}...`)
mongoose.connect(process.env.DATABASE_URI)

db.on('connected', function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

export default db
