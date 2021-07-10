import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './lib/db'
import { authUser, registerUser } from './controllers/users'
import { errorHandler, notFound } from './lib/error'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
	try {
		res.send('Welcome to the API')
	} catch (error) {
		console.log('error getting team standings')
	}
})

// connect auth db Mongo
connectDB()

// authentication routes
app.post('/users/login', authUser)
app.post('/users/', registerUser)

const PORT = process.env.PORT || 6000

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
