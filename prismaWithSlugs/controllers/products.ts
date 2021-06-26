import { prisma } from '../prismaClient'
import asyncHandler from 'express-async-handler'

export const getProductBySlug = asyncHandler(async (req, res) => {
	const slug = req.params.slug
	const product = await prisma.product.findUnique({
		where: {
			slug: slug,
		},
		include: {
			recommendations: true,
			includedItems: true,
		},
	})
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export const getCategoryProductsBySlug = asyncHandler(async (req, res) => {
	const slug = req.params.slug

	const category = await prisma.category.findUnique({
		where: {
			slug: slug,
		},
	})

	if (category) {
		const products = await prisma.product.findMany({
			where: {
				categoryId: category.id,
			},
		})

		res.json(products)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})

export const getCategorySlugs = asyncHandler(async (req, res) => {
	const categories = await prisma.category.findMany()
	if (categories) {
		const slugs = categories.map((category) => category.slug)
		res.json(slugs)
	} else {
		res.status(404)
		throw new Error('Category slugs not found')
	}
})

export const getProductSlugs = asyncHandler(async (req, res) => {
	const products = await prisma.product.findMany()
	if (products) {
		const slugs = products.map((product) => product.slug)
		res.json(slugs)
	} else {
		res.status(404)
		throw new Error('Product slugs not found')
	}
})
