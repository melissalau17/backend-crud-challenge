import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.ingredients.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      name: 'Test User', 
      email: 'testuser@example.com',
      password: passwordHash,
    },
  });

  const recipe1 = await prisma.recipe.upsert({
    where: { title: 'Spaghetti Bolognese' },
    update: {},
    create: {
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian dish',
      instructions:
        '1. Cook the spaghetti. 2. Fry the minced beef. 3. Add the tomato sauce to the beef. 4. Serve the spaghetti with the sauce.',
      user: { connect: { id: user.id } },
      ingredients: {
        create: [
          { name: 'Spaghetti', type: 'Pasta', amount: '200g' },
          { name: 'Minced Beef', type: 'Meat', amount: '300g' },
          { name: 'Tomato Sauce', type: 'Sauce', amount: '1 cup' },
          { name: 'Onion', type: 'Vegetable', amount: '1 medium' },
          { name: 'Garlic', type: 'Spice', amount: '2 cloves' },
        ],
      },
    },
  });

  const recipe2 = await prisma.recipe.upsert({
    where: { title: 'Chicken Curry' },
    update: {},
    create: {
      title: 'Chicken Curry',
      description: 'A spicy Indian dish',
      instructions:
        '1. Fry the chicken. 2. Add curry powder. 3. Add coconut milk. 4. Serve the curry with rice.',
      user: { connect: { id: user.id } },
      ingredients: {
        create: [
          { name: 'Chicken', type: 'Meat', amount: '500g' },
          { name: 'Curry Powder', type: 'Spice', amount: '2 tbsp' },
          { name: 'Coconut Milk', type: 'Liquid', amount: '1 cup' },
          { name: 'Garlic', type: 'Spice', amount: '3 cloves' },
          { name: 'Onion', type: 'Vegetable', amount: '1 medium' },
        ],
      },
    },
  });

  console.log('Seeding complete:', { user, recipe1, recipe2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
