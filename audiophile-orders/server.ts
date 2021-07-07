import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mysql from 'mysql'

dotenv.config()

console.log('server', process.env.SERVER_API_KEY)

const app = express()

express.json()

app.use(cors())

// PG

import { Pool } from 'pg'

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'audiophile_products',
	password: 'dubesdub86',
	port: 5432,
})

const text = 'INSERT INTO person(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']

// pool.connect().then((client) => {
// 	return client
// 		.query('CREATE TABLE person (name varchar(255), email varchar(255))')
// 		.then((res) => {
// 			client.release()
// 			console.log(res.rows[0])
// 		})
// 		.catch((err) => {
// 			client.release()
// 			console.log(err.stack)
// 		})
// })
pool.connect().then((client) => {
	return client
		.query(text, values)
		.then((res) => {
			client.release()
			console.log(res.rows[0])
		})
		.catch((err) => {
			client.release()
			console.log(err.stack)
		})
})

// MYSQL

// const con = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'jwd',
// 	password: 'wsw848',
// 	database: 'audiophile_products',
// })

// con.connect(function (err) {
// 	if (err) throw err
// 	console.log('Connected!')
// 	var sql = 'CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))'
// 	con.query(sql, function (err, result) {
// 		if (err) throw err
// 		console.log('Table created')
// 	})
// })

app.get('/', (req, res) => {
	try {
		res.send('Welcome to the NHL Stats API')
	} catch (error) {
		console.log('error getting team standings')
	}
})

app.get('/api/heywhatsup', (req, res) => {
	console.log(req)
	res.send('nothing much wbu')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
