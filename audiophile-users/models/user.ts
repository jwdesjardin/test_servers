import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserType extends mongoose.Document {
	_id: string
	name: string
	email: string
	password: string
	isAdmin: boolean
	matchPassword: (enteredPassword: string) => boolean
}

const userSchema = new mongoose.Schema<UserType>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// this will automatically run anytime a user is saved
userSchema.pre('save', async function (next: () => void) {
	// if the password is not modified then next()
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
