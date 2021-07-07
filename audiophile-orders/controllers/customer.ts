import asyncHandler from 'express-async-handler'
import { prisma } from '../prismaClient'

export const getAllCustomers = asyncHandler(async (req, res) => {
	try {
		const allCustomers = await prisma.customerInfo.findMany()
		res.status(200)
		res.send(allCustomers)
	} catch (e) {
		console.log('error customers not found', e)
		res.status(400)
		throw new Error()
	}
})
