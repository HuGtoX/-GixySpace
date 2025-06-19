import type { UserModel } from '@monorepo/model';
import { prisma } from '../../utils/prisma.js';
import { verifyPassword } from './private/hash.js';

export async function login(input: UserModel.LoginSchema): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      accountName: input.accountName,
    },
  });
  if (!user) {
    throw new Error('用户名或密码错误！');
  }
  const isValid = verifyPassword({
    candidatePassword: input.password,
    salt: user.salt,
    hash: user.hash,
  });

  return isValid;
}
