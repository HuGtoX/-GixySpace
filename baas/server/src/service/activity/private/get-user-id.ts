// src/service/activity/private/get-user-id.ts
import { prisma } from '@/utils/prisma.js';

export async function getUserId(accountName: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: {
      accountName,
    },
  });
  if (!user) {
    throw new Error('用户不存在');
  }
  return user.id;
}
