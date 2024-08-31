import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create categories
  const [electronicsCategory, clothingCategory, menCategory] =
    await Promise.all([
      prisma.category.create({
        data: { name: 'Electronics' },
      }),
      prisma.category.create({
        data: { name: 'Clothing ' },
      }),
      prisma.category.create({
        data: { name: 'Men ' },
      }),
    ]);

  // create products
  const [phoneProduct, tshirtProduct] = await Promise.all([
    prisma.product.create({
      data: {
        name: 'IPhone',
        description: 'Latest model',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Trasher',
        description: 'Posers t-shirt',
      },
    }),
  ]);

  // set categories to products
  await Promise.all([
    prisma.productCategory.create({
      data: {
        categoryId: electronicsCategory.id,
        productId: phoneProduct.id,
      },
    }),
    prisma.productCategory.create({
      data: {
        categoryId: clothingCategory.id,
        productId: tshirtProduct.id,
      },
    }),
    prisma.productCategory.create({
      data: {
        categoryId: menCategory.id,
        productId: tshirtProduct.id,
      },
    }),
  ]);

  // create stores
  const [streetStore, mallStore] = await Promise.all([
    prisma.store.create({
      data: {
        name: 'Street store',
        location: '14 Pushkina St, Moscow',
      },
    }),
    prisma.store.create({
      data: {
        name: 'Mall store',
        location: '17 Lenina St, Moscow',
      },
    }),
  ]);

  // create prices
  await Promise.all([
    prisma.price.create({
      data: {
        amount: 80000.0,
        currency: 'RUB',
        storeId: streetStore.id,
        productId: phoneProduct.id,
      },
    }),
    prisma.price.create({
      data: {
        amount: 79.99,
        currency: 'USD',
        storeId: mallStore.id,
        productId: phoneProduct.id,
      },
    }),
    prisma.price.create({
      data: {
        amount: 29.99,
        currency: 'USD',
        storeId: mallStore.id,
        productId: tshirtProduct.id,
      },
    }),
  ]);

  // create store stocks
  await Promise.all([
    prisma.storeStock.create({
      data: {
        quantity: 50,
        storeId: streetStore.id,
        productId: phoneProduct.id,
      },
    }),
    prisma.storeStock.create({
      data: {
        quantity: 100,
        storeId: mallStore.id,
        productId: tshirtProduct.id,
      },
    }),
  ]);

  // create warehouse stocks
  await Promise.all([
    prisma.warehouseStock.create({
      data: {
        quantity: 200,
        productId: phoneProduct.id,
      },
    }),
    prisma.warehouseStock.create({
      data: {
        quantity: 500,
        productId: tshirtProduct.id,
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
