import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

async function start() {
    try {
        if (!MONGO_URI) throw new Error('MONGO_URI not set')
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected')
        app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
    } catch (err) {
        console.error('Failed to start server', err)
        process.exit(1)
    }
}

start()
