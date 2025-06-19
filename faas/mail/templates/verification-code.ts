// templates/verification-code.ts
import { templateDir } from '../consts.ts';
import { join } from '../deps.ts';
import { MailTemplate } from '../src/mail-template.ts';

export const verificationCode = new MailTemplate(
  await Deno.readTextFile(join(templateDir, 'verification-code.tmpl')),
  {
    emailCode: 'string',
  },
  '验证码',
);
