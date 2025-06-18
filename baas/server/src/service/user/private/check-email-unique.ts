import { prisma } from '@/utils/prisma.js';

export async function checkEmailUnique(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error('邮箱已存在');
  }
}
