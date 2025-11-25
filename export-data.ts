import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany();
  const schools = await prisma.schools.findMany();
  const criterias = await prisma.criterias.findMany();
  const reviews = await prisma.reviews.findMany();
  const filieres = await prisma.filieres.findMany();
  const images = await prisma.images.findMany();
  const reviewScores = await prisma.reviewScores.findMany();

  // ... autres tables

  const data = {
    users,
    schools,
    criterias,
    reviews,
    filieres,
    images,
    reviewScores
  };

  fs.writeFileSync('data-export.json', JSON.stringify(data, null, 2));
  console.log('✅ Data exported to data-export.json');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });