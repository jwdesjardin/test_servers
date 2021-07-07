import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { postAnOrder } from './controllers/order'

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
// app.get('/order', getAllOrders)

// app.get('/order/:id', getUsersOrder)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
