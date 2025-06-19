import type { UserModel } from '@monorepo/model';
import { getVerificationCode } from './private/get-verification-code.js';
import { checkEmailUnique } from './private/check-email-unique.js';
import { sendVerificationCodeMail } from './private/send-verification-code-mail.js';
import { prisma } from '@/utils/prisma.js';
export async function sendVerificationCode(
  input: UserModel.SendVerificationCodeSchema,
): Promise<void> {
  const { email } = input;
  await checkEmailUnique(email);
  const emailVerification = await prisma.emailVerification.findUnique({
    where: {
      email,
    },
  });
  // 重试时间，每一分钟只能重试一次
  if (
    emailVerification &&
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).getTime() -
      new Date(emailVerification.updatedAt).getTime() <
      60000
  ) {
    throw new Error('验证码发送过于频繁');
  }
  const verificationCode = getVerificationCode();
  // 验证码过期时间为5分钟
  const expires = new Date(new Date().getTime() + 60 * 5 * 1000);
  await prisma.emailVerification.upsert({
    where: {
      email,
    },
    update: {
      verificationCode,
      expires,
    },
    create: {
      email,
      verificationCode,
      expires,
    },
  });
  await sendVerificationCodeMail(email, verificationCode);
}
