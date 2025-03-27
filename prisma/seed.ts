import { PrismaClient, Role, Condition, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seed Users
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      let role: Role = 'USER';
      if (account.role === 'ADMIN') {
        role = 'ADMIN';
      }

      console.log(`  Creating user: ${account.email} with role: ${role}`);

      await prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          email: account.email,
          password,
          role,
        },
      });
    }),
  );

  // Seed Stuff
  await Promise.all(
    config.defaultData.map(async (data, index) => {
      let condition: Condition = 'good';
      if (data.condition === 'poor') {
        condition = 'poor';
      } else if (data.condition === 'excellent') {
        condition = 'excellent';
      } else if (data.condition === 'fair') {
        condition = 'fair';
      }

      let category: Category = 'Other';
      if (
        data.category === 'Food'
        || data.category === 'Sporting_Goods'
        || data.category === 'Electronics'
      ) {
        category = data.category;
      }

      console.log(`  Adding stuff: ${data.name} (${data.owner}) [${category}]`);

      await prisma.stuff.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name: data.name,
          quantity: data.quantity,
          owner: data.owner,
          condition,
          category,
        },
      });
    }),
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
