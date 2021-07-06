import asyncHandler from 'express-async-handler'
import User, { UserType } from '../models/user'

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body
	console.log(email, password, name)

	// if their is a user with this email respond with error
	const userExists: UserType = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user: UserType = await User.create({ name, email, password })

	if (user) {
		// 201 - user was created  - respond with user data plus generated token
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		// error - user was unable to be created
		res.status(400)
		throw new Error('Invalid user data')
	}
})

export const authUser = () => {}

export const getUserProfile = () => {}
export const updateUserProfile = () => {}
