import type { UserModel } from '@monorepo/model';
import { hashPassword } from './private/hash.js';
import { verifyCode } from './private/verify-code.js';
import { prisma } from '@/utils/prisma.js';

export async function create(user: UserModel.CreatedSchema): Promise<void> {
  await verifyCode(user.email, user.verificationCode);
  const { salt, hash } = hashPassword(user.password);
  await prisma.user.create({
    data: {
      accountName: user.accountName,
      email: user.email,
      hash,
      salt,
      role: 'USER',
    },
  });
}
