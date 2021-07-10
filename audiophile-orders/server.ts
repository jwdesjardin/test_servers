import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { postAnOrder, getAllOrders, getUserOrders } from './controllers/order'
import { getAllCustomers } from './controllers/customer'
import { errorHandler, notFound } from './lib/error'
import connectDB from './lib/db'
import { authUser, registerUser } from './controllers/users'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
	res.send('Welcome to the Audiophile Orders/Users API')
})

// order Routes

app.post('/order', postAnOrder)
app.get('/order', getAllOrders)

app.get('/customer', getAllCustomers)

app.get('/order/:id', getUserOrders)

// connect auth db Mongo
connectDB()

// authentication routes
app.post('/users/login', authUser)
app.post('/users/', registerUser)

const PORT = process.env.PORT || 4000

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
