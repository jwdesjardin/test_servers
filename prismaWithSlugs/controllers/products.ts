import  {prisma}  from '../prismaClient';
import asyncHandler from 'express-async-handler';

export const getProductsById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({
    where: {
      id: id
    }, 
    include: {
      recommendations: true,
      includedItems: true
    }
  })
  if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
})

export const getCategoryById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const category = await prisma.category.findUnique({
    where: {
      id: id
    }
  })
  if (category) {
		res.json(category);
	} else {
		res.status(404);
		throw new Error('Category not found');
	}
})

export const getCategorySlugs = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany()
  if (categories) {
    const slugs = categories.map(category => category.id)
		res.json(slugs);
	} else {
		res.status(404);
		throw new Error('Category slugs not found');
	}
})

export const getProductSlugs = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany()
  if (products) {
    const slugs = products.map(product => product.id)
		res.json(slugs);
	} else {
		res.status(404);
		throw new Error('Product slugs not found');
	}
})