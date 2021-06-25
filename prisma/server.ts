import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

console.log('server', process.env.SERVER_API_KEY)

const app = express()

express.json()

app.use(cors())


import { getCategoryById, getCategorySlugs, getProductsById, getProductSlugs } from './controllers/products'



app.get('/', (req, res) => {
	try {
		res.send('Welcome to the API')
	} catch (error) {
		console.log('error getting team standings')
	}
})

//ROUTES for reading product data

app.get('/product/slugs', getProductSlugs)
app.get('/category/slugs', getCategorySlugs)
app.get('/product/:id', getProductsById)
app.get('/category/:id', getCategoryById)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
