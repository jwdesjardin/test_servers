import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const protect = asyncHandler(async (req, res, next) => {
	let token

	// if the authorization header exists and it starts with bearer
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// decode the jwt using the .env secret
			token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET || '')

			// set the user on the request to the user we decoded minus the password
			req.user = await User.findById(decoded.id).select('-password')

			console.log(decoded)

			next()
		} catch (error) {
			//token auth failed
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	//token was never found
	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})
