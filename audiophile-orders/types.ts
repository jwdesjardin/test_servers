export interface DbOrder {
	subtotal: number
	vaTax: number
	grandTotal: number
	cartItems: {
		quantity: number
		product: {
			cartImage: string
			slug: string
			price: number
			name: string
			cartName: string
		}
		orderId?: number
	}[]
	customerInfo: {
		userID: string
		name: string
		email: string
		phone: string
		address: string
		zip: string
		city: string
		country: string
	}
	paymentMethod: string
	emoneyNumber?: string
	emoneyPin?: string
}
