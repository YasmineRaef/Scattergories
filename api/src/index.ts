import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

(async () => {
  console.log('Prisma Client connected');
  const games = await prisma.games.findMany();
  console.log('Games:', games);

  await prisma.$disconnect();
})();