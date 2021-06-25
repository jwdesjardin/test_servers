import { PrismaClient } from '@prisma/client'
import { getProductSlugs } from '../controllers/products'
import axios from 'axios'
const prisma = new PrismaClient()
import myData from '../data.json'


const categorySwitch = (categorySTR: string) => {
  switch(categorySTR){
    case 'earphones':
      return 1
    case 'headphones':
      return 2
    case 'speakers':
      return 3
    default: 
    return 0
  }
}

const simpleFunc = async() => {
  console.log(myData)
 
}


const seedingFunction = async () => {
  
  
  
  myData.forEach(async (product: any) => {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        cartName: product.name.split(' ')[0],
        description: product.description,
        features: product.features,
        cartImage: `./assets/cart/image-${product.slug}.jpg`,
        galleryImageDesktop1: product.gallery.first.desktop,
        galleryImageDesktop2: product.gallery.second.desktop,
        galleryImageDesktop3: product.gallery.third.desktop,
        galleryImageMobile1: product.gallery.first.mobile,
        galleryImageMobile2: product.gallery.second.mobile,
        galleryImageMobile3: product.gallery.third.mobile,
        galleryImageTablet1: product.gallery.first.tablet,
        galleryImageTablet2: product.gallery.second.tablet,
        galleryImageTablet3: product.gallery.third.tablet,
        mainImageDesktop: product.image.desktop,
        mainImageMobile: product.image.mobile,
        mainImageTablet: product.image.tablet,
        price: product.price,
        slug: product.slug,
        categoryId: categorySwitch(product.category) ,
        recommendations: {
          create: product.others.map((other: any) => ({
            name: other.name,
            imageMobile: other.image.mobile,
            imageTablet: other.image.tablet,
            imageDesktop: other.image.desktop,
            slug: other.slug,
          })),
        },
        includedItems: {
          create: product.includes.map((included: any) => ({
            name: included.item,
            quantity: included.quantity
          }))
        },
      }
    })
  })

}




async function main() {

  

  const category1 = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Earphones',
      image: './assets/shared/desktop/image-earphones.png'
    }
  })
  const category2 = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Headphones',
      image: './assets/shared/desktop/image-headphones.png'
    }
  })
  const category3 = await prisma.category.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Speakers',
      image: './assets/shared/desktop/image-speakers.png'
    }
  })


  await seedingFunction()

  const products = await prisma.product.findMany({
    include: {
      recommendations: true,
      includedItems: true
    }
  })

  console.log(products)
  
  
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })