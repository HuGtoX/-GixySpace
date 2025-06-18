// src/service/user/private/verify-code.ts
import { prisma } from '@/utils/prisma.js';
export async function verifyCode(email: string, verificationCode: string): Promise<void> {
  const emailVerification = await prisma.emailVerification.findUnique({
    where: {
      email,
    },
  });
  if (!emailVerification) {
    throw new Error('验证码不存在');
  }
  if (emailVerification.verificationCode !== verificationCode) {
    throw new Error('验证码错误');
  }
  if (new Date() > new Date(emailVerification.expires)) {
    throw new Error('验证码已过期');
  }
}
