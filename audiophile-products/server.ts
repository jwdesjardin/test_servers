import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {
	getCategoryProductsBySlug,
	getCategorySlugs,
	getProductBySlug,
	getProductSlugs,
} from './controllers/products'

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

//ROUTES for reading product data

app.get('/product/slugs', getProductSlugs)
app.get('/category/slugs', getCategorySlugs)
app.get('/product/:slug', getProductBySlug)
app.get('/category/:slug', getCategoryProductsBySlug)

const PORT = process.env.PORT || 5000

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
