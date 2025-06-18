// src/service/user/get.ts

import type { UserModel } from '@monorepo/model';
import { prisma } from '@/utils/prisma.js';

export async function get(accountName: string): Promise<UserModel.GetSchema> {
  console.log(accountName);
  const user = await prisma.user.findUnique({
    where: {
      accountName,
    },
  });
  if (!user) {
    throw new Error('用户不存在');
  }
  return {
    accountName: user.accountName,
    email: user.email,
  };
}
