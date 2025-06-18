import Prisma1, * as Prisma2 from '@prisma/client';

const Prisma = Prisma1 || Prisma2;
export const prisma = new Prisma.PrismaClient();
