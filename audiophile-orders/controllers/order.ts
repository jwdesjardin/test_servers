import asyncHandler from 'express-async-handler'
import { prisma } from '../prismaClient'
import { DbOrder } from '../types'

export const postAnOrder = asyncHandler(async (req, res) => {
	try {
		const order: DbOrder = req.body

		const customerId = order.customerInfo.userID
		const returningCustomer = await prisma.customerInfo.findFirst({ where: { userID: customerId } })

		let preppedOrder: any

		if (returningCustomer) {
			preppedOrder = {
				...(await getCartItems(order)),
				subtotal: order.subtotal,
				vaTax: order.vaTax,
				grandTotal: order.grandTotal,
				paymentMethod: order.paymentMethod,
				customerInfoId: returningCustomer.id,
			}
		} else {
			preppedOrder = {
				...(await getCartItems(order)),
				subtotal: order.subtotal,
				vaTax: order.vaTax,
				grandTotal: order.grandTotal,
				paymentMethod: order.paymentMethod,
				customerInfo: {
					create: {
						name: order.customerInfo.name,
						email: order.customerInfo.email,
						phone: order.customerInfo.phone,
						address: order.customerInfo.address,
						zip: order.customerInfo.zip,
						city: order.customerInfo.city,
						country: order.customerInfo.country,
						userID: order.customerInfo.userID,
					},
				},
			}
		}

		if (order.paymentMethod === 'emoney' && order.emoneyNumber && order.emoneyPin) {
			preppedOrder = {
				...preppedOrder,
				emoneyNumber: order.emoneyNumber,
				emoneyPin: order.emoneyPin,
			}
		}
		console.log('creating order', { data: preppedOrder })
		const createdOrder = await prisma.order.create({ data: preppedOrder })
		res.status(201)
		res.send(createdOrder)
	} catch (e) {
		console.log('error order not created', e)
		res.status(400)
		throw new Error()
	}
})

export const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const allOrders = await prisma.order.findMany({
			include: {
				cartItems: true,
				customerInfo: true,
			},
		})
		res.status(200)
		res.send(allOrders)
	} catch (e) {
		console.log('error orders not found', e)
		res.status(400)
		throw new Error()
	}
})

const getCartItems = async (order: DbOrder) => {
	const items = await Promise.all(
		order.cartItems.map(async (cartItem) => {
			const itemID = cartItem.product.slug
			const exsistingProduct = await prisma.product.findFirst({ where: { slug: itemID } })

			if (exsistingProduct) {
				return {
					quantity: cartItem.quantity,
					productId: exsistingProduct.id,
				}
			} else {
				return {
					quantity: cartItem.quantity,
					product: {
						create: {
							cartImage: cartItem.product.cartImage,
							cartName: cartItem.product.cartName,
							name: cartItem.product.name,
							price: cartItem.product.price,
							slug: cartItem.product.slug,
						},
					},
				}
			}
		})
	)

	return {
		cartItems: {
			create: items,
		},
	}
}
