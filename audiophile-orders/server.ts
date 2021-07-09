import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { postAnOrder, getAllOrders, getUserOrders } from './controllers/order'
import { getAllCustomers } from './controllers/customer'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
	res.send('Welcome to the Audiophile Orders API')
})

// order Routes

app.post('/order', postAnOrder)
app.get('/order', getAllOrders)

app.get('/customer', getAllCustomers)

app.get('/order/:id', getUserOrders)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
